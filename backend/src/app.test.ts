import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'
import { createApp } from './app'
import type { VisitorLogger } from './visitorLogger'

function loggerMock(): VisitorLogger {
  return {
    record: vi.fn().mockResolvedValue(undefined),
    removeExpiredLogs: vi.fn().mockResolvedValue(0),
  }
}

describe('portfolio API', () => {
  it('reports a healthy service', async () => {
    const response = await request(createApp({ visitorLogger: loggerMock() })).get(
      '/api/health',
    )

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ status: 'ok' })
  })

  it('streams the CV with an attachment filename', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-cv-'))
    const cvPath = path.join(directory, 'cv.pdf')
    await writeFile(cvPath, '%PDF-1.4 test')

    const response = await request(
      createApp({
        visitorLogger: loggerMock(),
        cvPath,
        cvDownloadName: 'Jiahe-Li-CV.pdf',
      }),
    ).get('/api/cv')

    expect(response.status).toBe(200)
    expect(response.headers['content-disposition']).toContain(
      'attachment; filename="Jiahe-Li-CV.pdf"',
    )
    expect(response.headers['content-type']).toContain('application/pdf')
  })

  it('records a validated visit using the forwarded client IP', async () => {
    const visitorLogger = loggerMock()
    const response = await request(createApp({ visitorLogger }))
      .post('/api/visits')
      .set('User-Agent', 'Portfolio test browser')
      .set('X-Forwarded-For', '203.0.113.42')
      .send({ path: '/', referrer: 'https://example.com/' })

    expect(response.status).toBe(204)
    expect(visitorLogger.record).toHaveBeenCalledWith(
      expect.objectContaining({
        ip: '203.0.113.42',
        userAgent: 'Portfolio test browser',
        path: '/',
        referrer: 'https://example.com/',
      }),
    )
  })

  it('rejects malformed visit data', async () => {
    const visitorLogger = loggerMock()
    const response = await request(createApp({ visitorLogger }))
      .post('/api/visits')
      .send({ path: 'not-an-absolute-path', referrer: 42 })

    expect(response.status).toBe(400)
    expect(visitorLogger.record).not.toHaveBeenCalled()
  })

  it('rate limits repeated visit events', async () => {
    const app = createApp({ visitorLogger: loggerMock(), visitRateLimit: 1 })
    const payload = { path: '/', referrer: '' }

    expect((await request(app).post('/api/visits').send(payload)).status).toBe(204)
    expect((await request(app).post('/api/visits').send(payload)).status).toBe(429)
  })
})

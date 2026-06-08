import { mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { JsonlVisitorLogger } from './visitorLogger'

describe('JsonlVisitorLogger', () => {
  it('writes structured visits to the daily JSONL file and stdout', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-logs-'))
    const logger = new JsonlVisitorLogger(directory, 30)
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined)

    await logger.record({
      timestamp: '2026-06-08T12:00:00.000Z',
      ip: '203.0.113.1',
      userAgent: 'Test',
      path: '/',
      referrer: '',
    })

    const content = await readFile(
      path.join(directory, 'visits-2026-06-08.jsonl'),
      'utf8',
    )
    expect(JSON.parse(content)).toMatchObject({
      event: 'portfolio_visit',
      ip: '203.0.113.1',
    })
    expect(consoleSpy).toHaveBeenCalledOnce()
    consoleSpy.mockRestore()
  })

  it('removes dated logs older than the retention period', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-logs-'))
    await writeFile(path.join(directory, 'visits-2026-04-01.jsonl'), '{}\n')
    await writeFile(path.join(directory, 'visits-2026-06-01.jsonl'), '{}\n')
    await writeFile(path.join(directory, 'notes.txt'), 'keep')
    const logger = new JsonlVisitorLogger(directory, 30)

    const removed = await logger.removeExpiredLogs(
      new Date('2026-06-08T12:00:00.000Z'),
    )
    const remaining = await readdir(directory)

    expect(removed).toBe(1)
    expect(remaining).toContain('visits-2026-06-01.jsonl')
    expect(remaining).toContain('notes.txt')
    expect(remaining).not.toContain('visits-2026-04-01.jsonl')
  })
})

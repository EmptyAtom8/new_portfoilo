import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('portfolio application', () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))

  beforeEach(() => {
    delete window.portfolioVisitRecordedForPageLoad
    fetchMock.mockClear()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('renders the major portfolio sections and CV links', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /Jiahe "Tony" Li/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Skills I use to move ideas/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Advance Zero Emission Tool')).toBeInTheDocument()
    expect(screen.getByText('Image Anomaly Detection')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Download CV/i })[0]).toHaveAttribute(
      'href',
      '/api/cv',
    )
  })

  it('opens and closes the mobile navigation menu', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /Open navigation menu/i })

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(screen.getByRole('link', { name: 'Skills' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('reports one visit for the browser session', async () => {
    const firstRender = render(<App />)
    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/visits',
      expect.objectContaining({ method: 'POST', keepalive: true }),
    )

    firstRender.unmount()
    render(<App />)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(fetchMock).toHaveBeenCalledOnce()
  })
})

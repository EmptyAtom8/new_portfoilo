import '@testing-library/jest-dom/vitest'

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = []

  disconnect() {}
  observe(target: Element) {
    target.classList.add('is-visible')
  }
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}

window.IntersectionObserver = IntersectionObserverMock

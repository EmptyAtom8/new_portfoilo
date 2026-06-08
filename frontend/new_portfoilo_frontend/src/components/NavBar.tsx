import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Commercial Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setIsOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="logo" href="#home" aria-label="Jiahe Li, back to top">
          JL<span>.</span>
        </a>
        <button
          className={`menu-toggle ${isOpen ? 'is-open' : ''}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul id="primary-navigation" className={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a className="nav-cta" href="/api/cv" download>
              Download CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

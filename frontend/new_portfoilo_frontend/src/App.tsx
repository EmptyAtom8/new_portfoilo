import { useEffect } from 'react'
import './App.css'
import AboutMe from './components/AboutMe'
import ContactDetails from './components/ContactDetails'
import GeneralIntroduction from './components/GeneralIntroduction'
import NavBar from './components/NavBar'
import OtherProjectExperience from './components/OtherProjectExperince'
import ProfessionalWorkExperience from './components/ProfessionalWorkExperience'
import SkillsSection from './components/SkillsSection'

declare global {
  interface Window {
    portfolioVisitRecordedForPageLoad?: boolean
  }
}

function App() {
  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    )

    revealElements.forEach((element) => observer.observe(element))

    if (!window.portfolioVisitRecordedForPageLoad) {
      window.portfolioVisitRecordedForPageLoad = true
      void fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer,
        }),
        keepalive: true,
      }).catch(() => {
        // Analytics must never interrupt the portfolio experience.
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <NavBar />
      <main>
        <AboutMe />
        <GeneralIntroduction />
        <SkillsSection />
        <ProfessionalWorkExperience />
        <OtherProjectExperience />
        <ContactDetails />
      </main>
    </>
  )
}

export default App

import type { CSSProperties } from 'react'
import archeryPhoto from '../assets/roundProfile.jpeg'

const milestones = [
  {
    label: 'Professional',
    title: 'Junior Software Engineer',
    detail: 'Newcastle Marine Service',
    date: '2024 - Present',
  },
  {
    label: 'Postgraduate',
    title: 'MSc Computer Science',
    detail: 'Newcastle University, Merit',
    date: '2022 - 2023',
  },
  {
    label: 'Undergraduate',
    title: 'BSc Marketing & Management',
    detail: 'Newcastle University',
    date: '2019 - 2022',
  },
]

export default function GeneralIntroduction() {
  return (
    <section id="about" className="section about-section">
      <div className="section-heading" data-reveal>
        
        <h2>About Me </h2>
      </div>
      <div className="about-layout">
        <div className="about-photo-wrap" data-reveal>
          <div className="about-photo-accent" aria-hidden="true" />
          <img
            className="about-photo"
            src={archeryPhoto}
            alt="Jiahe Li practising archery outdoors"
            loading="lazy"
          />
          <div className="photo-caption">
            <strong>Beyond the keyboard</strong>
            <span>BUCS indoor archery bronze medallist</span>
          </div>
        </div>
        <div className="about-content">
          <p className="about-lead" data-reveal>
            I am a full-stack engineer with commercial experience delivering and
            maintaining software for the marine sector, from vessel planning and
            emissions analysis to KPI reporting.
          </p>
          <p data-reveal>
            My computer science background is paired with earlier training in
            marketing and management. That combination helps me move comfortably
            between technical detail, user needs, and practical business outcomes.
            I enjoy taking products through the complete lifecycle: requirements,
            implementation, deployment, feedback, and iteration.
          </p>
          <div className="milestone-grid">
            {milestones.map((milestone, index) => (
              <article
                className="milestone-card"
                key={milestone.label}
                data-reveal
                style={{ '--delay': `${index * 100}ms` } as CSSProperties}
              >
                <span>{milestone.label}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.detail}</p>
                <small>{milestone.date}</small>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

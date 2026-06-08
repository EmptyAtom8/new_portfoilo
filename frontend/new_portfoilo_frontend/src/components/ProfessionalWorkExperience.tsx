import type { CSSProperties } from 'react'

const projects = [
  {
    index: '01',
    title: 'Advance Zero Emission Tool',
    context: 'Innovate UK Clean Maritime programme',
    summary:
      'A simulation and analytics workflow for vessel powertrain analysis, including engine and battery-assisted operation and control logic focused on reducing CO₂ emissions.',
    technologies: ['React', 'Python', 'Flask', 'Modelica', 'ZMQ'],
  },
  {
    index: '02',
    title: 'Vessel Planner',
    context: 'Internal planning platform',
    summary:
      'A full-stack planning system for creating, validating, and managing vessel records. Delivered through multiple stakeholder-led iterations and deployed to a production VPS.',
    technologies: ['React', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Nginx'],
  },
  {
    index: '03',
    title: 'BIMCO Shipping KPI Tool',
    context: 'Fleet performance reporting',
    summary:
      'An application for logging, calculating, and visualising fleet key performance indicators, maintained in a Linux deployment environment with iterative releases.',
    technologies: ['React', 'TypeScript', 'Express', 'SQLite', 'Prisma', 'Nginx'],
  },
]

export default function ProfessionalWorkExperience() {
  return (
    <section id="work" className="section work-section">
      <div className="section-heading split-heading" data-reveal>
        <div>
          <p className="eyebrow">Commercial experience</p>
          <h2>Software built for working teams.</h2>
        </div>
        <p>
          Selected projects from my role at Newcastle Marine Service. Details are
          limited to non-confidential information from my CV.
        </p>
      </div>
      <div className="work-list">
        {projects.map((project, index) => (
          <article
            className="work-card"
            key={project.title}
            data-reveal
            style={{ '--delay': `${index * 90}ms` } as CSSProperties}
          >
            <div className="work-index">{project.index}</div>
            <div className="work-copy">
              <span>{project.context}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </div>
            <div className="technology-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

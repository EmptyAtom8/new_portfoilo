import type { CSSProperties } from 'react'
import marketingImage from '../assets/FinalSEM1.png'
import navigationImage from '../assets/GroupProject.png'
import marketingReport from '../assets/MKT3019 FinalSEM1.pdf'
import sentimentReport from '../assets/MKT3019FinalKai.pdf'
import machineLearningImage from '../assets/MachineLearning.png'
import sentimentImage from '../assets/MKT3019FinalKai.png'

const projects = [
  {
    title: 'Full-stack Navigation App',
    category: 'University team project',
    description:
      'A mobile-focused guide to local attractions backed by a Java API and persistent data services.',
    image: navigationImage,
    alt: 'Navigation application interface',
    technologies: ['Vue', 'Java', 'Spring Boot', 'MySQL', 'Redis'],
    link: 'https://github.com/EmptyAtom8/streetNavigationVueJava/tree/main/csc8019-team10_-final-project',
    action: 'View on GitHub',
  },
  {
    title: 'Image Anomaly Detection',
    category: 'MSc dissertation',
    description:
      'A computer vision model designed to identify blockages and debris from video of UK canal systems.',
    image: machineLearningImage,
    alt: 'Machine learning anomaly detection example',
    technologies: ['Python', 'PyTorch', 'OpenCV'],
    link: 'https://github.com/EmptyAtom8/machineLearningDissertation',
    action: 'View on GitHub',
  },
  {
    title: 'Data-Driven Marketing Report',
    category: 'Business analytics',
    description:
      'Analysis of a footwear retailer’s market performance, turning statistical evidence into commercial recommendations.',
    image: marketingImage,
    alt: 'Marketing performance analysis charts',
    technologies: ['SPSS', 'Tableau', 'Data Analysis'],
    link: marketingReport,
    action: 'View report',
  },
  {
    title: 'Customer Sentiment Analysis',
    category: 'Business analytics',
    description:
      'Textual sentiment analysis and visualisation used to investigate customer preferences for market expansion.',
    image: sentimentImage,
    alt: 'Customer sentiment word cloud',
    technologies: ['Alteryx', 'SPSS', 'Regression'],
    link: sentimentReport,
    action: 'View report',
  },
]

export default function OtherProjectExperience() {
  return (
    <section id="projects" className="section projects-section">
      <div className="section-heading centered" data-reveal>
        <p className="eyebrow">Selected projects</p>
        <h2>Experiments, research, and earlier builds.</h2>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article
            className="project-card"
            key={project.title}
            data-reveal
            style={{ '--delay': `${(index % 2) * 100}ms` } as CSSProperties}
          >
            <a
              className="project-image"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.action}: ${project.title}`}
            >
              <img src={project.image} alt={project.alt} loading="lazy" />
              <span aria-hidden="true">↗</span>
            </a>
            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technology-list">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
                {project.action} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

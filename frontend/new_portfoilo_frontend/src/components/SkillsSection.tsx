import type { CSSProperties } from 'react'

const skillGroups = [
  {
    number: '01',
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'Vue', 'HTML', 'CSS', 'Vite'],
  },
  {
    number: '02',
    title: 'Backend',
    skills: ['Python', 'Java', 'Express', 'Flask', 'Django', 'Spring Boot', 'REST APIs'],
  },
  {
    number: '03',
    title: 'Machine Learning',
    skills: ['PyTorch', 'OpenCV', 'TensorFlow', 'Computer Vision', 'Data Processing'],
  },
  {
    number: '04',
    title: 'Databases',
    skills: ['PostgreSQL', 'SQLite', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    number: '05',
    title: 'DevOps & Tools',
    skills: ['Git', 'Docker', 'Nginx', 'Linux', 'Bash', 'TeamCity', 'tmux'],
  },
  {
    number: '06',
    title: 'Engineering & Data',
    skills: ['Modelica', 'OpenModelica', 'ROS2', 'Tableau', 'SPSS', 'Alteryx'],
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-heading centered" data-reveal>
        <p className="eyebrow">Technical toolkit</p>
        <h2>Skills I use to move ideas into production.</h2>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article
            className="skill-card"
            key={group.title}
            data-reveal
            style={{ '--delay': `${(index % 3) * 90}ms` } as CSSProperties}
          >
            <span className="skill-number">{group.number}</span>
            <h3>{group.title}</h3>
            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

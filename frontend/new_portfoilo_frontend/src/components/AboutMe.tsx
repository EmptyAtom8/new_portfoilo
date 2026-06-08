import graduationPhoto from '../assets/DSC00984.JPG'

export default function AboutMe() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow hero-enter hero-enter-one">Hello, I&apos;m</p>
        <h1 className="hero-enter hero-enter-two">
          Jiahe <span>&quot;Tony&quot;</span> Li
        </h1>
        <p className="hero-role hero-enter hero-enter-three">
          Full-stack software engineer building practical tools for real-world
          engineering and business problems.
        </p>
        <div className="hero-actions hero-enter hero-enter-four">
          <a className="button button-primary" href="/api/cv" download>
            Download CV
          </a>
          <a className="button button-secondary" href="#contact">
            Contact me
          </a>
        </div>
        <div className="social-links hero-enter hero-enter-five">
          <a
            href="https://www.linkedin.com/in/jiahe-li-31b6761a6/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/EmptyAtom8?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="hero-visual hero-enter hero-enter-three">
        <div className="portrait-frame">
          <img
            src={graduationPhoto}
            alt="Jiahe Li wearing graduation robes"
            fetchPriority="high"
          />
        </div>
        <div className="floating-tag tag-top">React + TypeScript</div>
        <div className="floating-tag tag-bottom">Python + Java</div>
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to About section">
        <span>Explore</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

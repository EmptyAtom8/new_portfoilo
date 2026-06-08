export default function ContactDetails() {
  return (
    <>
      <section id="contact" className="section contact-section">
        <div className="contact-card" data-reveal>
          <p className="eyebrow">Let&apos;s build something useful</p>
          <h2>Have a role, project, or interesting problem in mind?</h2>
          <p>
            I am open to software engineering opportunities focused on practical
            business applications, backend systems, and full-stack development.
          </p>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:tonylijiahe@icloud.com">
              Email me
            </a>
            <a
              className="button button-outline-light"
              href="https://www.linkedin.com/in/jiahe-li-31b6761a6/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <a className="contact-email" href="mailto:tonylijiahe@icloud.com">
            tonylijiahe@icloud.com
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <div>
          <a className="logo footer-logo" href="#home">
            JL<span>.</span>
          </a>
          <p>Designed and built by Jiahe Li.</p>
        </div>
        <details className="privacy-notice">
          <summary>Privacy notice</summary>
          <p>
            This site records your IP address, browser user agent, visited path,
            and referrer for security and basic traffic monitoring. Records are
            stored securely for 30 days and are not sold or used for advertising.
          </p>
        </details>
        <a className="back-to-top" href="#home">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  )
}

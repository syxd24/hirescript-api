type LandingPageProps = {
  onGenerateClick: () => void
}

const metrics = [
  ['30s', 'Average generation time'],
  ['7', 'tone profiles'],
  ['6', 'seniority levels'],
  ['100%', 'editable output'],
]

const steps = [
  ['Fill in the form', '5 short steps covering the role, skills, salary, culture, and preferred writing tone.'],
  ['AI writes your JD', 'Generate a structured, bias-aware job description matched to seniority and tone settings.'],
  ['Copy or export', 'Review the draft, edit any section, then copy the final version when it is ready.'],
]

const features = [
  ['7 tone profiles', 'From formal to startup bold, match every company voice without rewriting from scratch.'],
  ['Inclusive language engine', 'Helps hiring teams avoid exclusionary phrasing and keep the JD candidate-friendly.'],
  ['Skill-aware requirements', 'Separate must-have and nice-to-have skills so candidates understand the bar clearly.'],
  ['Company and culture context', 'Add industry, benefits, and culture keywords so the draft sounds specific.'],
]

function LandingPage({ onGenerateClick }: LandingPageProps) {
  return (
    <main>
      <section className="hero-section">
        <div className="grid-glow" aria-hidden="true"></div>
        <div className="hero-copy">
          <p className="hero-badge">AI-powered &middot; 30 seconds</p>
          <h1>
            Write job descriptions that <span>attract top talent</span>
          </h1>
          <p className="hero-text">
            Fill in a short form. HireScript AI generates a polished, bias-aware
            JD tailored to your tone, seniority level, and company voice.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={onGenerateClick}>
              Generate a job description
            </button>
            <a href="#preview" className="outline-button">
              See example output
            </a>
          </div>
        </div>
      </section>

      <section className="metrics" aria-label="HireScript metrics">
        {metrics.map(([value, label]) => (
          <div className="metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="preview-section" id="preview" aria-label="Generator preview mockup">
        <div className="preview-shell">
          <div className="preview-header">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <span className="preview-url">hirescript.app &middot; generator</span>
          </div>
          <div className="generator-preview">
            <aside className="preview-form">
              <p className="preview-label">Steps</p>
              {['Job basics', 'Skills and requirements', 'Compensation', 'Culture and benefits', 'Tone and style'].map(
                (label, index) => (
                  <div className={`preview-step ${index === 0 ? 'active' : ''}`} key={label}>
                    <span></span>
                    {label}
                  </div>
                ),
              )}
              <div className="mini-form-card">
                <span>Job title</span>
                <strong>Senior Backend Engineer</strong>
                <span>Seniority</span>
                <div className="chip-row">
                  <b>Senior</b>
                  <em>Lead</em>
                  <em>Mid</em>
                </div>
              </div>
            </aside>

            <div className="preview-output">
              <p className="preview-output-title">Generated JD output</p>
              <div className="line head"></div>
              <div className="line full"></div>
              <div className="line med"></div>
              <div className="line full"></div>
              <div className="line short"></div>
              <div className="line-gap"></div>
              <div className="line head narrow"></div>
              <div className="line full"></div>
              <div className="line med"></div>
              <div className="line full"></div>
              <div className="line full"></div>
              <div className="line short"></div>
              <div className="line-gap"></div>
              <div className="line head mid"></div>
              <div className="line med"></div>
              <div className="line full"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>From blank page to ready-to-post in three steps</h2>
        </div>
        <div className="steps-grid">
          {steps.map(([title, description], index) => (
            <article className="step-card" key={title}>
              <span className="step-number">{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" id="features">
        <div className="section-heading">
          <p className="eyebrow">Features</p>
          <h2>Built for modern hiring teams</h2>
        </div>
        <div className="feature-grid">
          {features.map(([title, description]) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <h2>Ready to hire smarter?</h2>
          <p>Generate your first job description for free. No credit card required.</p>
        </div>
        <button className="primary-button" type="button" onClick={onGenerateClick}>
          Start generating now
        </button>
      </section>

      <footer className="footer">
        <span>2026 HireScript. All rights reserved.</span>
        <span>Privacy</span>
        <span>Terms</span>
        <span>Contact</span>
      </footer>
    </main>
  )
}

export default LandingPage

type GeneratorPlaceholderProps = {
  onBackClick: () => void
}

function GeneratorPlaceholder({ onBackClick }: GeneratorPlaceholderProps) {
  return (
    <main className="generator-page">
      <section className="generator-placeholder" aria-labelledby="generator-title">
        <div className="generator-topbar">
          <button className="back-button" type="button" onClick={onBackClick}>
            Back
          </button>
          <span>New JD</span>
          <span>1 / 5</span>
        </div>
        <div className="placeholder-stepper" aria-hidden="true">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="placeholder-body">
          <p className="hero-badge">HireScript workspace</p>
          <h1 id="generator-title">Generator form coming next</h1>
          <p>
            The next phase will add the guided job description form here, using
            the same compact flow shown in the mobile mockup.
          </p>
          <div className="placeholder-fields" aria-hidden="true">
            <div>
              <span>Job title</span>
              <strong>Senior Backend Engineer</strong>
            </div>
            <div>
              <span>Seniority</span>
              <strong>Senior</strong>
            </div>
            <div>
              <span>Tone profile</span>
              <strong>Professional</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default GeneratorPlaceholder

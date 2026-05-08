import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import type {
  EducationRequirement,
  JdFormData,
  Seniority,
  TargetLength,
  Tone,
  WorkMode,
} from '../types/jd'

type GeneratorFormProps = {
  onBackToLanding: () => void
}

type RequiredField = 'jobTitle' | 'location' | 'mustHaveSkills'
type FormErrors = Partial<Record<RequiredField, string>>

type Step = {
  title: string
  subtitle: string
  requiredFields: RequiredField[]
}

const seniorityOptions: Seniority[] = ['INTERN', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'DIRECTOR']
const workModeOptions: WorkMode[] = ['REMOTE', 'HYBRID', 'ON_SITE']
const toneOptions: Tone[] = [
  'FORMAL',
  'PROFESSIONAL',
  'PROFESSIONAL_FRIENDLY',
  'CONVERSATIONAL',
  'CONFIDENT',
  'INCLUSIVE',
  'STARTUP_BOLD',
]
const targetLengthOptions: TargetLength[] = ['SHORT', 'MEDIUM', 'LONG']
const educationOptions: EducationRequirement[] = [
  'NONE',
  'BACHELOR_OR_EQUIV',
  'MASTERS_PREFERRED',
  'PHD_PREFERRED',
]

const steps: Step[] = [
  {
    title: 'Job basics',
    subtitle: 'Role, seniority and location',
    requiredFields: ['jobTitle', 'location'],
  },
  {
    title: 'Skills and requirements',
    subtitle: 'Must-have and nice-to-have',
    requiredFields: ['mustHaveSkills'],
  },
  {
    title: 'Compensation',
    subtitle: 'Salary range and benefits',
    requiredFields: [],
  },
  {
    title: 'Culture and context',
    subtitle: 'Company voice and opportunities',
    requiredFields: [],
  },
  {
    title: 'Tone and output',
    subtitle: 'How should the JD sound?',
    requiredFields: [],
  },
]

const initialFormData: JdFormData = {
  jobTitle: '',
  companyName: '',
  department: '',
  industry: '',
  seniority: 'MID',
  location: '',
  workMode: 'REMOTE',
  mustHaveSkills: '',
  niceToHaveSkills: '',
  yearsExperience: '',
  educationRequirement: 'NONE',
  salaryMin: '',
  salaryMax: '',
  salaryCurrency: 'USD',
  benefits: '',
  cultureKeywords: '',
  growthOpportunity: '',
  targetPersona: '',
  tone: 'PROFESSIONAL',
  targetLength: 'MEDIUM',
  notes: '',
}

function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function splitList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function fallback(value: string, emptyValue: string) {
  return value.trim() || emptyValue
}

function GeneratorForm({ onBackToLanding }: GeneratorFormProps) {
  const [formData, setFormData] = useState<JdFormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState<FormErrors>({})
  const [hasGenerated, setHasGenerated] = useState(false)
  const [showCompactResult, setShowCompactResult] = useState(false)
  const [panelWidth, setPanelWidth] = useState(400)
  const [isResizing, setIsResizing] = useState(false)
  const formContentRef = useRef<HTMLDivElement>(null)

  const activeStep = steps[currentStep]
  const mustHaveSkills = splitList(formData.mustHaveSkills)
  const niceToHaveSkills = splitList(formData.niceToHaveSkills)
  const benefits = splitList(formData.benefits)
  const canGenerate = Boolean(formData.jobTitle.trim() && formData.location.trim() && mustHaveSkills.length > 0)

  useEffect(() => {
    formContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  useEffect(() => {
    if (!isResizing) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (window.innerWidth <= 1000) {
        return
      }

      const nextWidth = Math.min(Math.max(event.clientX, 340), 520)
      setPanelWidth(nextWidth)
    }

    const handlePointerUp = () => {
      setIsResizing(false)
    }

    document.body.classList.add('is-resizing-panel')
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      document.body.classList.remove('is-resizing-panel')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isResizing])

  const updateField = <Key extends keyof JdFormData>(field: Key, value: JdFormData[Key]) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleFieldChange =
    <Key extends keyof JdFormData>(field: Key) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      updateField(field, event.target.value as JdFormData[Key])
    }

  const validateStep = (stepIndex: number) => {
    const nextErrors: FormErrors = {}
    const requiredFields = steps[stepIndex].requiredFields

    if (requiredFields.includes('jobTitle') && !formData.jobTitle.trim()) {
      nextErrors.jobTitle = 'Add a job title to continue.'
    }

    if (requiredFields.includes('location') && !formData.location.trim()) {
      nextErrors.location = 'Add a location to continue.'
    }

    if (requiredFields.includes('mustHaveSkills') && mustHaveSkills.length === 0) {
      nextErrors.mustHaveSkills = 'Add at least one must-have skill.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const isCurrentStepComplete = () => {
    if (activeStep.requiredFields.includes('jobTitle') && !formData.jobTitle.trim()) {
      return false
    }

    if (activeStep.requiredFields.includes('location') && !formData.location.trim()) {
      return false
    }

    if (activeStep.requiredFields.includes('mustHaveSkills') && mustHaveSkills.length === 0) {
      return false
    }

    return true
  }

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || validateStep(currentStep)) {
      setCurrentStep(stepIndex)
    }
  }

  const goNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1))
    }
  }

  const generatePreview = () => {
    for (let index = 0; index < steps.length; index += 1) {
      if (!validateStep(index)) {
        setCurrentStep(index)
        return
      }
    }

    setHasGenerated(true)
    if (window.matchMedia('(max-width: 999px)').matches) {
      setShowCompactResult(true)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentStep < steps.length - 1) {
      goNext()
      return
    }

    generatePreview()
  }

  const jdPreviewDocument = (
    <JdPreviewDocument
      formData={formData}
      mustHaveSkills={mustHaveSkills}
      niceToHaveSkills={niceToHaveSkills}
    />
  )
  const workspaceStyle = {
    '--form-panel-width': `${panelWidth}px`,
  } as CSSProperties & Record<'--form-panel-width', string>

  if (showCompactResult) {
    return (
      <main className="jd-workspace compact-result-screen">
        <header className="jd-appbar">
          <div className="jd-appbar-left">
            <button className="jd-logo-button" type="button" onClick={onBackToLanding}>
              <span className="brand-mark" aria-hidden="true">
                HS
              </span>
              <span>HireScript</span>
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="jd-breadcrumb">
              New JD <span>&middot; Preview result</span>
            </span>
          </div>
          <div className="jd-appbar-actions">
            <button
              className="appbar-button"
              type="button"
              onClick={() => setShowCompactResult(false)}
            >
              Back to form
            </button>
          </div>
        </header>
        <section className="compact-result-panel">
          <div className="output-panel-head">
            <div>
              <h2>JD Output</h2>
              <span className="output-status generated">Preview mode</span>
            </div>
            <div className="output-actions">
              <button type="button">Copy</button>
              <button type="button">Export</button>
            </div>
          </div>
          <div className="output-content output-content-animated">{jdPreviewDocument}</div>
        </section>
      </main>
    )
  }

  return (
    <main className="jd-workspace">
      <header className="jd-appbar">
        <div className="jd-appbar-left">
          <button className="jd-logo-button" type="button" onClick={onBackToLanding}>
            <span className="brand-mark" aria-hidden="true">
              HS
            </span>
            <span>HireScript</span>
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="jd-breadcrumb">
            New JD <span>&middot; {activeStep.title}</span>
          </span>
        </div>

        <div className="jd-appbar-actions">
          <button className="appbar-button" type="button">
            Save draft
          </button>
          <button
            className="appbar-button appbar-button-primary"
            type="button"
            onClick={generatePreview}
            disabled={!canGenerate}
          >
            Generate JD
          </button>
        </div>
      </header>

      <div className="jd-appbody" style={workspaceStyle}>
        <aside className="jd-form-panel">
          <div className="form-panel-head">
            <p className="step-label">Step {currentStep + 1} of {steps.length}</p>
            <h1>{activeStep.title}</h1>
            <p>{activeStep.subtitle}</p>
          </div>

          <div className="circle-stepper" aria-label="Generator progress">
            {steps.map((step, index) => (
              <button
                className={[
                  'circle-step',
                  index < currentStep ? 'done' : '',
                  index === currentStep ? 'active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                onClick={() => goToStep(index)}
                key={step.title}
                aria-label={step.title}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <form className="workspace-form" onSubmit={handleSubmit}>
            <div className="workspace-form-content" ref={formContentRef}>
              <div className="step-content" key={currentStep}>
                {currentStep === 0 && (
                  <>
                  <label className="workspace-field">
                    <span>Job title <b>*</b></span>
                    <input
                      value={formData.jobTitle}
                      onChange={handleFieldChange('jobTitle')}
                      placeholder="Senior Backend Engineer"
                    />
                    {errors.jobTitle && <small>{errors.jobTitle}</small>}
                  </label>

                  <label className="workspace-field">
                    <span>Seniority <b>*</b></span>
                    <select value={formData.seniority} onChange={handleFieldChange('seniority')}>
                      {seniorityOptions.map((option) => (
                        <option value={option} key={option}>
                          {formatEnum(option)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="workspace-field">
                    <span>Department</span>
                    <input
                      value={formData.department}
                      onChange={handleFieldChange('department')}
                      placeholder="Engineering"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Location <b>*</b></span>
                    <input
                      value={formData.location}
                      onChange={handleFieldChange('location')}
                      placeholder="Warsaw, PL"
                    />
                    {errors.location && <small>{errors.location}</small>}
                  </label>

                  <label className="workspace-field">
                    <span>Work mode <b>*</b></span>
                    <select value={formData.workMode} onChange={handleFieldChange('workMode')}>
                      {workModeOptions.map((option) => (
                        <option value={option} key={option}>
                          {formatEnum(option)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="workspace-field">
                    <span>Company name</span>
                    <input
                      value={formData.companyName}
                      onChange={handleFieldChange('companyName')}
                      placeholder="HireScript"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Industry</span>
                    <input
                      value={formData.industry}
                      onChange={handleFieldChange('industry')}
                      placeholder="FinTech"
                    />
                  </label>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                  <label className="workspace-field">
                    <span>Must-have skills <b>*</b></span>
                    <input
                      value={formData.mustHaveSkills}
                      onChange={handleFieldChange('mustHaveSkills')}
                      placeholder="Java, Kafka, PostgreSQL"
                    />
                    {errors.mustHaveSkills && <small>{errors.mustHaveSkills}</small>}
                  </label>
                  <SkillTags values={mustHaveSkills} emptyText="Comma-separated skills will appear here." />

                  <label className="workspace-field">
                    <span>Nice-to-have skills</span>
                    <input
                      value={formData.niceToHaveSkills}
                      onChange={handleFieldChange('niceToHaveSkills')}
                      placeholder="Terraform, Go, AWS"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Years of experience</span>
                    <input
                      value={formData.yearsExperience}
                      onChange={handleFieldChange('yearsExperience')}
                      placeholder="5+ years"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Education requirement</span>
                    <select
                      value={formData.educationRequirement}
                      onChange={handleFieldChange('educationRequirement')}
                    >
                      {educationOptions.map((option) => (
                        <option value={option} key={option}>
                          {formatEnum(option)}
                        </option>
                      ))}
                    </select>
                  </label>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                  <label className="workspace-field">
                    <span>Salary minimum</span>
                    <input
                      value={formData.salaryMin}
                      onChange={handleFieldChange('salaryMin')}
                      placeholder="90000"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Salary maximum</span>
                    <input
                      value={formData.salaryMax}
                      onChange={handleFieldChange('salaryMax')}
                      placeholder="120000"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Salary currency</span>
                    <input
                      value={formData.salaryCurrency}
                      onChange={handleFieldChange('salaryCurrency')}
                      placeholder="EUR"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Benefits</span>
                    <input
                      value={formData.benefits}
                      onChange={handleFieldChange('benefits')}
                      placeholder="Remote, equity, L&D budget"
                    />
                  </label>
                  <SkillTags values={benefits} emptyText="Optional benefit tags will appear here." />
                  </>
                )}

                {currentStep === 3 && (
                  <>
                  <label className="workspace-field">
                    <span>Culture keywords</span>
                    <input
                      value={formData.cultureKeywords}
                      onChange={handleFieldChange('cultureKeywords')}
                      placeholder="Ownership, async-first, no-ego"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Growth opportunity</span>
                    <textarea
                      value={formData.growthOpportunity}
                      onChange={handleFieldChange('growthOpportunity')}
                      placeholder="Fast-track to Staff Engineer for top performers."
                      rows={3}
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Target persona</span>
                    <input
                      value={formData.targetPersona}
                      onChange={handleFieldChange('targetPersona')}
                      placeholder="Ex-startup engineers who want impact"
                    />
                  </label>

                  <label className="workspace-field">
                    <span>Notes</span>
                    <textarea
                      value={formData.notes}
                      onChange={handleFieldChange('notes')}
                      placeholder="Anything else the AI should know."
                      rows={3}
                    />
                  </label>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                  <label className="workspace-field">
                    <span>Tone <b>*</b></span>
                    <select value={formData.tone} onChange={handleFieldChange('tone')}>
                      {toneOptions.map((option) => (
                        <option value={option} key={option}>
                          {formatEnum(option)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="workspace-field">
                    <span>Target length <b>*</b></span>
                    <select value={formData.targetLength} onChange={handleFieldChange('targetLength')}>
                      {targetLengthOptions.map((option) => (
                        <option value={option} key={option}>
                          {formatEnum(option)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="ready-card">
                    <strong>Ready to generate</strong>
                    <span>
                      {fallback(formData.jobTitle, 'Untitled role')} - {formatEnum(formData.tone)} -{' '}
                      {formatEnum(formData.targetLength)}
                    </span>
                  </div>
                  </>
                )}
              </div>
            </div>

            <div className="workspace-form-footer">
              <span>Step {currentStep + 1} / {steps.length}</span>
              <div>
                <button
                  className="workspace-button workspace-button-secondary"
                  type="button"
                  onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
                  disabled={currentStep === 0}
                >
                  Back
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    className="workspace-button workspace-button-primary"
                    type="submit"
                    disabled={!isCurrentStepComplete()}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="workspace-button workspace-button-primary"
                    type="submit"
                    disabled={!canGenerate}
                  >
                    Generate JD
                  </button>
                )}
              </div>
            </div>
          </form>
        </aside>

        <button
          className="panel-resize-handle"
          type="button"
          aria-label="Resize form panel"
          onPointerDown={(event) => {
            if (window.innerWidth <= 1000) {
              return
            }

            event.preventDefault()
            setIsResizing(true)
          }}
        />

        <section className="jd-output-panel" aria-label="JD output preview">
          <div className="output-panel-head">
            <div>
              <h2>JD Output</h2>
              <span className={`output-status ${hasGenerated ? 'generated' : ''}`}>
                {hasGenerated ? 'Preview mode' : 'Waiting for generation'}
              </span>
            </div>
            <div className="output-actions">
              <button type="button">Copy</button>
              <button type="button">Export</button>
              <button type="button" onClick={generatePreview} disabled={!canGenerate}>
                Regenerate
              </button>
            </div>
          </div>

          <div className="output-content">
            {hasGenerated ? (
              <div className="output-content-animated">{jdPreviewDocument}</div>
            ) : (
              <div className="output-empty-state">
                <div aria-hidden="true">HS</div>
                <h2>Your JD will appear here</h2>
                <p>Complete the form and click Generate JD.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

function JdPreviewDocument({
  formData,
  mustHaveSkills,
  niceToHaveSkills,
}: {
  formData: JdFormData
  mustHaveSkills: string[]
  niceToHaveSkills: string[]
}) {
  return (
    <article className="fake-jd-document">
      <h1>{fallback(formData.jobTitle, 'Untitled role')}</h1>
      <div className="jd-meta-row">
        <span>{formatEnum(formData.workMode)}</span>
        <span>{fallback(formData.location, 'Location not set')}</span>
        <span>{formatEnum(formData.seniority)}</span>
        <span>{fallback(formData.industry, 'Industry not set')}</span>
      </div>

      <section>
        <h3>About the role</h3>
        <p>
          Backend connection comes in Phase 3. This preview shows how the generated job
          description will occupy the editor workspace after the API is connected.
        </p>
        <p>
          We are looking for a {formatEnum(formData.seniority).toLowerCase()} candidate to help
          build reliable systems, collaborate with the team, and bring strong product judgment to
          the role.
        </p>
      </section>

      <section>
        <h3>Must-have skills</h3>
        <ul>
          {mustHaveSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      {niceToHaveSkills.length > 0 && (
        <section>
          <h3>Nice to have</h3>
          <ul>
            {niceToHaveSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3>Tone and length</h3>
        <p>
          Tone: {formatEnum(formData.tone)}. Target length: {formatEnum(formData.targetLength)}.
        </p>
      </section>
    </article>
  )
}

function SkillTags({ values, emptyText }: { values: string[]; emptyText: string }) {
  return (
    <div className="tag-preview">
      {values.length > 0 ? values.map((value) => <span key={value}>{value}</span>) : <em>{emptyText}</em>}
    </div>
  )
}

export default GeneratorForm

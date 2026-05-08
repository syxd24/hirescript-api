export type Seniority = 'INTERN' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD' | 'DIRECTOR'

export type WorkMode = 'REMOTE' | 'HYBRID' | 'ON_SITE'

export type Tone =
  | 'FORMAL'
  | 'PROFESSIONAL'
  | 'PROFESSIONAL_FRIENDLY'
  | 'CONVERSATIONAL'
  | 'CONFIDENT'
  | 'INCLUSIVE'
  | 'STARTUP_BOLD'

export type TargetLength = 'SHORT' | 'MEDIUM' | 'LONG'

export type EducationRequirement =
  | 'NONE'
  | 'BACHELOR_OR_EQUIV'
  | 'MASTERS_PREFERRED'
  | 'PHD_PREFERRED'

export type JdFormData = {
  jobTitle: string
  companyName: string
  department: string
  industry: string
  seniority: Seniority
  location: string
  workMode: WorkMode
  mustHaveSkills: string
  niceToHaveSkills: string
  yearsExperience: string
  educationRequirement: EducationRequirement
  salaryMin: string
  salaryMax: string
  salaryCurrency: string
  benefits: string
  cultureKeywords: string
  growthOpportunity: string
  targetPersona: string
  tone: Tone
  targetLength: TargetLength
  notes: string
}

export type JdPreviewData = Omit<JdFormData, 'mustHaveSkills' | 'niceToHaveSkills'> & {
  mustHaveSkills: string[]
  niceToHaveSkills: string[]
}

export type GenerateJdRequest = {
  jobTitle: string
  seniority: Seniority
  location: string
  workMode: WorkMode
  mustHaveSkills: string[]
  tone: Tone
  targetLength: TargetLength
  companyName?: string
  department?: string
  industry?: string
  niceToHaveSkills?: string[]
  yearsExperience?: string
  educationRequirement?: EducationRequirement
  salaryMin?: number
  salaryMax?: number
  salaryCurrency?: string
  benefits?: string[]
  cultureKeywords?: string[]
  growthOpportunity?: string
  targetPersona?: string
  notes?: string
}

export type GenerateJdResponse = {
  id: string
  content: string
}

export type ProblemDetail = {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
}

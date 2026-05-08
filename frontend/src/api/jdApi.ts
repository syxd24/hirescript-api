import type { GenerateJdRequest, GenerateJdResponse, ProblemDetail } from '../types/jd'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:9097'
const BACKEND_CONNECTION_ERROR = 'Could not connect to backend. Make sure the backend is running.'

export class JdApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'JdApiError'
    this.status = status
  }
}

export async function generateJd(request: GenerateJdRequest): Promise<GenerateJdResponse> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}/api/jd/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
  } catch {
    throw new JdApiError(BACKEND_CONNECTION_ERROR)
  }

  if (!response.ok) {
    const problem = await readProblemDetail(response)
    throw new JdApiError(problem?.detail || problem?.title || 'Could not generate job description.', response.status)
  }

  return (await response.json()) as GenerateJdResponse
}

async function readProblemDetail(response: Response): Promise<ProblemDetail | null> {
  try {
    return (await response.json()) as ProblemDetail
  } catch {
    return null
  }
}

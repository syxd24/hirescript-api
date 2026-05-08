# HireScript AI

HireScript AI is an AI-assisted job description generator SaaS.

Users fill in a short structured form with role details, skills, seniority, work mode, tone, and output length. The app sends the request to a Spring Boot backend, which calls an external Python AI API, saves the request/output to Supabase PostgreSQL, and returns a polished job description to the frontend.

## Live Links

Frontend:

https://hirescript-ai.vercel.app

Backend health check:

https://hirescript-api.onrender.com/api/health

---

## Features

- 5-step job description generator form
- AI-generated job description output
- Real backend API integration
- Supabase PostgreSQL persistence
- Request and generated output saving
- Responsive desktop/tablet/mobile UI
- Split-screen desktop workspace
- Mobile-friendly result screen
- Loading animation while AI is generating
- Clean formatted JD output
- Copy generated JD
- Regenerate JD
- Secure Python API call using internal secret header

---

## Tech Stack

### Backend

- Java
- Spring Boot
- Maven
- Spring Web
- Spring Validation
- Spring Data JPA
- PostgreSQL / Supabase
- Flyway
- Docker
- Render

### Frontend

- React
- TypeScript
- Vite
- CSS
- Vercel

### AI Service

- External Python AI API
- Internal backend-to-backend API secret

---

## Architecture

```text
User
  ↓
React + TypeScript frontend
  ↓
Spring Boot backend
  ↓
External Python AI API
  ↓
Spring Boot backend saves data
  ↓
Supabase PostgreSQL
  ↓
Spring Boot returns generated JD
  ↓
Frontend displays formatted JD

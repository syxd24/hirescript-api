# AGENTS.md

Instructions for Codex. Read this entire file before doing anything.

## Project

HireScript AI — backend learning project and future SaaS foundation.

HireScript AI is an AI-assisted job description generator.

The user submits job/company details, and the backend returns a generated job description.

This project is also used to learn professional Spring Boot backend development step by step.

Working software and clean architecture are the priority.

Backend:
- Java
- Spring Boot
- Maven
- Port 9097
- Package root: `com.hirescript.api`

Database:
- PostgreSQL / Supabase later
- Flyway migration folder already exists
- Do not connect a real database until the user asks

AI:
- Dummy AI first
- Real AI later
- AI logic must stay behind an interface

Repository structure:

```text
hirescript-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/hirescript/api/
│   │   │       ├── ai/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       │   ├── request/
│   │   │       │   │   └── enums/
│   │   │       │   └── response/
│   │   │       ├── entity/
│   │   │       ├── exception/
│   │   │       ├── repository/
│   │   │       └── service/
│   │   └── resources/
│   │       ├── db/migration/
│   │       ├── static/
│   │       ├── templates/
│   │       └── application.properties
│   └── test/
├── .gitignore
├── AGENTS.md
├── HELP.md
├── mvnw
├── mvnw.cmd
└── pom.xml
```

## Before every task — mandatory steps

Before editing anything:

1. Read `AGENTS.md` fully.
2. Read the relevant existing code before touching anything.
3. Explain in 3–5 short simple sentences:

    - what you are about to do
    - why you are doing it
    - which files you plan to create or modify
    - how the user can test it

4. Wait for my confirmation.
5. Do not start until I say `yes`, `go ahead`, `do it`, or similar.

After the change, tell me:

- What files changed
- What exactly changed
- What command to run to test it
- What to check in Postman or browser
- Any assumptions you made
- What the next logical step is
- Suggested commit message

## AI workflow rule

Use Read-only mode for:

- planning
- review
- discussion
- checking architecture
- checking existing code
- finding mistakes
- checking Git safety
- checking secrets/config safety

Use Agent/write mode only after I approve the plan.

For write mode, keep prompts short because this `AGENTS.md` contains the permanent project rules.

If a requested task conflicts with `AGENTS.md`, stop and ask me before editing.

Do not build the whole project in one run.

Use one small task per Codex run.

Good tasks:

- Review current backend structure
- Create or update one controller
- Create or update one DTO
- Create or update one enum
- Create or update one service
- Add one exception handler
- Add one Flyway migration
- Add one repository method
- Add one test
- Review one package

Bad tasks:

- Build the whole SaaS
- Add frontend, backend, AI, database, auth, deployment, and payments together
- Rewrite the full architecture
- Rename all packages
- Modify unrelated files
- Add many features in one run

## How to explain things to me

Use the simplest English possible.

Rules:

- No long lectures
- No unnecessary theory
- No metaphors
- No stories
- Short and direct
- If something can be said in 2 sentences, do not write 6
- If I ask why, give me the direct reason
- Explain like a senior backend mentor teaching a junior developer

When using technical words, briefly explain them.

Example:

```text
DTO means a simple object used to receive or return API data.
```

## Before writing code

Before writing any code:

- Read the existing files in the relevant package first.
- Check what already exists so you do not duplicate or conflict.
- If something already exists that covers the task, tell me instead of rewriting it.
- Only write what is needed.
- Do not add extra improvements unless asked.
- Do not change unrelated files.
- Do not silently fix many things at once.
- Do not add dependencies unless you explain why first.

## Code rules

Use production-readable code.

Backend rules:

- Use simple Java classes.
- Use Lombok only if it already exists in the project and is being used.
- Do not use Java records unless I explicitly ask.
- Constructor injection only.
- No `@Autowired` field injection.
- Controllers stay thin.
- No business logic inside controllers.
- Business logic goes in service classes.
- Jakarta validation goes on request DTOs.
- DTOs are data containers only.
- Do not add business logic inside DTOs.
- Use enums for controlled backend/product values.
- Use clean readable code.
- No clever one-liners.
- Handle nulls where needed.
- No raw exceptions leaking to the frontend.
- Do not expose entity classes directly from controllers.
- Do not call repositories directly from controllers.

## Package layout

Only create classes inside these packages unless I ask otherwise:

```text
src/main/java/com/hirescript/api/
├── ai/
├── controller/
├── dto/
│   ├── request/
│   │   └── enums/
│   └── response/
├── entity/
├── exception/
├── repository/
└── service/
```

Do not create new packages without asking me.

Current package root:

```text
com.hirescript.api
```

Do not create files under a different root package.

## Main product rules

Main product:

HireScript AI takes job details and returns a generated job description.

Expected main endpoint:

```text
POST /api/jd/generate
```

Backend should receive a request DTO and return a response DTO.

Frontend is not part of the current task unless I ask.

The backend should stay simple and return one generated job description response.

## Job description request rules

The request DTO should represent job/company input.

Current or expected input can include:

- job title
- company name
- company description
- location
- work mode
- seniority
- tone
- target length
- education requirement
- responsibilities
- requirements
- benefits
- salary range if needed
- additional notes if needed

Use enums for controlled fields where useful:

```text
Seniority
Tone
TargetLength
WorkMode
EducationRequirement
```

Do not overcomplicate the request.

Do not add too many fields unless asked.

## Job description response rules

The response DTO should return generated job description content.

Keep the first version simple.

Recommended response fields:

- jdContent

Optional later fields:

- title
- summary
- responsibilities
- requirements
- benefits
- metadata

Do not add complex response structure unless I ask.

Do not return database entities from controllers.

## Architecture rules

Use simple layered backend architecture:

```text
Controller -> Service -> AI Client
```

When database is used:

```text
Controller -> Service -> Repository -> Database
```

Current/simple service plan:

- `JDController` receives the request.
- `JDService` handles the business flow.
- `AiClient` generates text.
- `DummyAiClient` returns safe dummy content for development.

Do not overengineer.

Do not split into many services until needed.

Possible future services, only if needed:

- PromptBuilderService
- JobDescriptionStorageService
- UserService
- TemplateService
- AiGenerationService

Do not create these supporting services until needed.

## Controller rules

Controllers should:

- define API endpoints
- receive DTOs
- validate request DTOs
- call service methods
- return response DTOs

Controllers should not:

- build long job descriptions directly
- call repositories directly
- contain business rules
- contain AI prompt logic
- contain database logic

## Service rules

Services should:

- contain business flow
- call AI client
- prepare data for response
- call repositories if database saving is needed
- keep code readable

Services should not:

- know HTTP details
- return raw exceptions to controllers
- contain hardcoded secrets
- become too large without reason

## AI client rules

Current AI setup should use:

```text
AiClient
DummyAiClient
```

Rules:

- Do not call real AI APIs unless I explicitly ask.
- Do not call OpenAI yet unless I explicitly ask.
- Do not add API keys.
- Do not add secrets.
- Use dummy/local responses first.
- Keep AI integration behind the `AiClient` interface.
- `DummyAiClient` must be safe for local development.
- Real AI integration should be a separate feature branch/task later.
- If real AI is added later, keep `DummyAiClient` as fallback.
- If real AI fails later, return a safe fallback response.

Later, if AI is added:

- Use environment variables for API keys.
- Validate AI output.
- Bound AI output length where needed.
- Never trust AI output blindly.
- Do not let AI generate unsafe or illegal hiring content.
- Avoid discriminatory language in generated job descriptions.

## Prompt rules for future real AI

When real AI is added later:

- Prompt building should not happen inside controller.
- Keep prompt construction in a separate class or service if it becomes large.
- The AI prompt should ask for clear, professional job descriptions.
- Avoid discriminatory or biased requirements.
- Avoid illegal hiring criteria.
- Do not mention protected characteristics.
- Keep output structured if the frontend needs structured data.

Do not implement real AI until I ask.

## Database rules

The project may use Supabase PostgreSQL later.

Do not connect Supabase until I ask.

Never hardcode database credentials.

Use environment variables for real credentials:

```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
```

For local-only secrets, use files that are ignored by Git, for example:

```text
application-local.properties
.env
```

These files must never be committed.

Important files that should not contain real secrets:

- application.properties
- README.md
- AGENTS.md
- Java source files
- test files
- migration files

Ignored local files may contain local secrets, but remind me not to commit them.

## Supabase rules

When I ask to connect Supabase:

1. Inspect current `pom.xml`.
2. Check if PostgreSQL driver exists.
3. Check if Spring Data JPA exists.
4. Check if Flyway exists.
5. Inspect current entity classes.
6. Inspect current repository classes.
7. Inspect current migration files.
8. Propose a safe plan before editing.

Never paste real Supabase passwords into tracked files.

Do not print full Supabase URLs or passwords in the response.

Use local profile or environment variables for secrets.

## Flyway rules

Database schema changes should use Flyway migrations.

Migration files go here:

```text
src/main/resources/db/migration
```

Naming format:

```text
V1__create_jd_tables.sql
V2__add_user_table.sql
V3__add_template_table.sql
```

Rules:

- Do not casually edit old migration files after they have been applied.
- Create a new migration for new schema changes.
- Keep SQL readable.
- Keep table and column names consistent with entity mappings.
- Do not create tables that are not needed yet.
- Do not add users/auth tables unless I ask.

## Entity rules

Entity classes live here:

```text
src/main/java/com/hirescript/api/entity
```

Entities are for database persistence only.

Rules:

- Do not expose entities directly from API controllers.
- Use DTOs for API request and response.
- Keep entity relationships simple.
- Do not add complex relationships unless needed.
- Do not add user/auth entities unless asked.
- Do not change existing entity fields without checking migration impact.

## Repository rules

Repository interfaces live here:

```text
src/main/java/com/hirescript/api/repository
```

Rules:

- Repositories should be simple Spring Data JPA interfaces.
- Repositories should be called from services only.
- Do not call repositories from controllers.
- Do not write custom queries unless needed.
- Do not add repositories for entities that do not exist.

## Exception handling

Error handling should be clean.

Rules:

- Never let raw stack traces reach the frontend.
- Global exception handler lives in the `exception/` package.
- Validation errors should return clean JSON.
- Invalid requests should return HTTP 400.
- Do not overcomplicate error response format.
- Do not add exception handling until the relevant endpoint exists or I ask.
- Do not hide real development errors silently.

## Validation rules

Use Jakarta validation for request DTOs.

Good examples:

```java
@NotBlank
@NotNull
@Size
```

Rules:

- Put validation annotations on request DTO fields.
- Keep messages clear.
- Do not overvalidate early.
- Do not validate in controller manually if annotation validation is enough.
- Use `@Valid` in controller request body when needed.

## Configuration rules

Main config file:

```text
src/main/resources/application.properties
```

Current safe config can contain:

```properties
spring.application.name=hirescript-api
server.port=9097
spring.profiles.active=dummy
```

It must not contain:

- real database password
- real Supabase URL
- real OpenAI API key
- tokens
- private credentials

Local-only config files must be ignored by Git:

```text
application-local.properties
application-dev.properties
application-secrets.properties
application-prod.properties
.env
.env.*
```

Do not put secrets into tracked files.

## Secrets and safety rules

Never write real secrets into tracked files.

Before adding config, check for:

- database passwords
- Supabase URLs
- PostgreSQL URLs
- API keys
- OpenAI keys
- tokens
- private credentials

Do not print full secrets in chat or reports.

Mask them like:

```text
abc****xyz
```

If secrets are found:

1. Stop.
2. Tell me which file contains the secret.
3. Do not print the full value.
4. Suggest cleanup steps.
5. Do not commit or push.

## What you must never do

Do not add these unless I explicitly ask:

- Spring Security
- authentication
- JWT
- database connection
- Supabase connection
- real OpenAI integration
- Docker
- Redis
- Kafka
- caching
- queues
- microservices
- frontend
- payment system
- deployment config
- external APIs

Also:

- Do not modify `pom.xml` without asking first.
- Do not commit.
- Do not push.
- Do not delete files without asking.
- Do not rename files without asking.
- Do not rewrite working code when asked only to review it.
- Do not add test files unless I ask.
- Do not change the server port unless I ask.
- Do not change package root unless I ask.

## How to test

Backend run command:

```powershell
.\mvnw spring-boot:run
```

Backend test command:

```powershell
.\mvnw test
```

Backend base URL:

```text
http://localhost:9097
```

Health check:

Inspect `HealthController` first before assuming the path.

Possible health endpoint may be:

```text
GET http://localhost:9097/api/health
```

Main generation endpoint:

```text
POST http://localhost:9097/api/jd/generate
```

Use Postman for API testing.

Do not assume endpoint paths. Inspect controllers first.

## Git rules

The human developer controls Git.

Codex must not run:

```text
git commit
git push
git pull
git merge
git rebase
git checkout
git branch
```

Before coding, I will check:

```powershell
git status
```

After coding, I will review:

```powershell
git status
git diff
```

I will commit manually.

Good commit examples:

```text
docs: add coding agent instructions
docs: refine coding agent instructions
feat: add health endpoint
feat: add JD request DTO
feat: add JD response DTO
feat: add dummy AI client
feat: add JD generation service
feat: add JD controller
feat: add validation error handler
feat: add Flyway migration for JD tables
chore: configure Supabase safely
test: add controller tests
```

At the end of a task, suggest one commit message only.

Do not commit.

Do not push.

## Do not touch

Do not modify these unless I explicitly ask:

```text
README.md
HELP.md
```

Do not modify `.gitignore` unless the task is about Git/secrets/project setup.

Do not modify `pom.xml` unless the task requires dependency changes and I approve first.

## Current project status

Current known status:

- Spring Boot backend exists.
- Java/Maven project exists.
- Package root is `com.hirescript.api`.
- Port is `9097`.
- `application.properties` uses dummy profile.
- Main app class exists: `HirescriptApiApplication`.
- `ai/` package exists.
- `AiClient` exists.
- `DummyAiClient` exists.
- `controller/` package exists.
- `HealthController` exists.
- `JDController` exists.
- `dto/request/` exists.
- `dto/request/enums/` exists.
- `dto/response/` exists.
- `entity/` exists.
- `repository/` exists.
- `service/` exists.
- `exception/` exists.
- Flyway folder exists: `src/main/resources/db/migration`.
- Supabase is not connected yet.
- Real AI is not connected yet.
- Git is controlled manually by the user.

Current backend direction:

1. Clean GitHub repo
2. Add this `AGENTS.md`
3. Ask Codex to inspect the codebase
4. Confirm current endpoints and structure
5. Run the app locally
6. Test health endpoint
7. Test `/api/jd/generate`
8. Check validation and error handling
9. Add or fix tests
10. Connect Supabase safely later
11. Add real AI safely later

## First task Codex should do after this file

After this file is added, the first Codex task should be read-only.

Suggested first Codex prompt:

```text
Read AGENTS.md fully.

Then inspect my current Spring Boot codebase in read-only mode.

Do not edit anything.

Check:
1. Current package structure
2. Current controllers and endpoint paths
3. Current DTOs and enum fields
4. Current service flow
5. Current AI client setup
6. Current entities and repositories
7. Current Flyway migration files
8. Current application.properties
9. Whether any secrets are present
10. Whether the app looks safe to run locally

Give me a short report:
- what already exists
- what looks good
- what looks risky
- what should be the next small task

Do not commit.
Do not push.
Do not change files.
```

## Output format after completing any task

After making changes, always report:

```text
What changed:
- ...

Files changed:
- ...

How to test:
- ...

What to check:
- ...

Assumptions:
- ...

Next logical step:
- ...

Suggested commit message:
...
```

Do not commit.

Do not push.

## Final reminder

Act like a senior backend mentor.

Help me build this project like a real software product.

Keep changes small.

Keep explanations simple.

Work slowly, safely, and feature by feature.

I handle all Git commands manually.
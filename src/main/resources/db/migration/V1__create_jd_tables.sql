CREATE TABLE job_descriptions (
                                  id UUID PRIMARY KEY,
                                  job_title VARCHAR(150) NOT NULL,
                                  content TEXT NOT NULL,
                                  user_id UUID NULL,
                                  created_at TIMESTAMPTZ NOT NULL,
                                  updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE jd_request_inputs (
                                   id UUID PRIMARY KEY,
                                   job_description_id UUID NOT NULL UNIQUE,
                                   seniority VARCHAR(50),
                                   location VARCHAR(150),
                                   work_mode VARCHAR(50),
                                   tone VARCHAR(50),
                                   target_length VARCHAR(50),
                                   must_have_skills TEXT[],
                                   nice_to_have_skills TEXT[],
                                   salary_min INTEGER,
                                   salary_max INTEGER,
                                   salary_currency VARCHAR(3),
                                   education_requirement VARCHAR(50),
                                   years_experience VARCHAR(50),
                                   department VARCHAR(100),
                                   company_name VARCHAR(100),
                                   industry VARCHAR(100),
                                   benefits TEXT[],
                                   culture_keywords TEXT[],
                                   target_persona VARCHAR(255),
                                   growth_opportunity TEXT,
                                   notes TEXT,

                                   CONSTRAINT fk_jd_request_inputs_job_description
                                       FOREIGN KEY (job_description_id)
                                           REFERENCES job_descriptions(id)
                                           ON DELETE CASCADE
);
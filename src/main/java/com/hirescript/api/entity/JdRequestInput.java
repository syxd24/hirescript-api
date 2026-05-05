package com.hirescript.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "jd_request_inputs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JdRequestInput {

    @Id
    private UUID id;

    @OneToOne
    @JoinColumn(name = "job_description_id", nullable = false, unique = true)
    private JobDescription jobDescription;

    private String seniority;
    private String location;

    @Column(name = "work_mode")
    private String workMode;

    private String tone;

    @Column(name = "target_length")
    private String targetLength;

    @Column(name = "must_have_skills", columnDefinition = "text[]")
    private List<String> mustHaveSkills;

    @Column(name = "nice_to_have_skills", columnDefinition = "text[]")
    private List<String> niceToHaveSkills;

    @Column(name = "salary_min")
    private Integer salaryMin;

    @Column(name = "salary_max")
    private Integer salaryMax;

    @Column(name = "salary_currency")
    private String salaryCurrency;

    @Column(name = "education_requirement")
    private String educationRequirement;

    @Column(name = "years_experience")
    private String yearsExperience;

    private String department;

    @Column(name = "company_name")
    private String companyName;

    private String industry;

    @Column(columnDefinition = "text[]")
    private List<String> benefits;

    @Column(name = "culture_keywords", columnDefinition = "text[]")
    private List<String> cultureKeywords;

    @Column(name = "target_persona")
    private String targetPersona;

    @Column(name = "growth_opportunity")
    private String growthOpportunity;

    private String notes;
}
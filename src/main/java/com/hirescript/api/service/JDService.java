package com.hirescript.api.service;

import com.hirescript.api.ai.AiClient;
import com.hirescript.api.dto.request.JDRequest;
import com.hirescript.api.dto.response.JDResponse;
import com.hirescript.api.entity.JdRequestInput;
import com.hirescript.api.entity.JobDescription;
import com.hirescript.api.repository.JdRequestInputRepository;
import com.hirescript.api.repository.JobDescriptionRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class JDService {

    private final AiClient aiClient;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final JdRequestInputRepository jdRequestInputRepository;

    public JDService(
            AiClient aiClient,
            JobDescriptionRepository jobDescriptionRepository,
            JdRequestInputRepository jdRequestInputRepository
    ) {
        this.aiClient = aiClient;
        this.jobDescriptionRepository = jobDescriptionRepository;
        this.jdRequestInputRepository = jdRequestInputRepository;
    }

    public JDResponse generateJd(JDRequest request) {
        String content = aiClient.generateJobDescription(request);

        OffsetDateTime now = OffsetDateTime.now();

        JobDescription jobDescription = JobDescription.builder()
                .id(UUID.randomUUID())
                .jobTitle(request.getJobTitle())
                .content(content)
                .userId(null)
                .createdAt(now)
                .updatedAt(now)
                .build();

        JobDescription savedJobDescription = jobDescriptionRepository.save(jobDescription);

        JdRequestInput jdRequestInput = JdRequestInput.builder()
                .id(UUID.randomUUID())
                .jobDescription(savedJobDescription)
                .seniority(request.getSeniority().name())
                .location(request.getLocation())
                .workMode(request.getWorkMode().name())
                .tone(request.getTone().name())
                .targetLength(request.getTargetLength().name())
                .mustHaveSkills(request.getMustHaveSkills())
                .niceToHaveSkills(request.getNiceToHaveSkills())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .salaryCurrency(request.getSalaryCurrency())
                .educationRequirement(
                        request.getEducationRequirement() == null ? null : request.getEducationRequirement().name()
                )
                .yearsExperience(request.getYearsExperience())
                .department(request.getDepartment())
                .companyName(request.getCompanyName())
                .industry(request.getIndustry())
                .benefits(request.getBenefits())
                .cultureKeywords(request.getCultureKeywords())
                .targetPersona(request.getTargetPersona())
                .growthOpportunity(request.getGrowthOpportunity())
                .notes(request.getNotes())
                .build();

        jdRequestInputRepository.save(jdRequestInput);

        return new JDResponse(savedJobDescription.getId(), savedJobDescription.getContent());
    }
}
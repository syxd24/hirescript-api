package com.hirescript.api.dto.request;

import com.hirescript.api.dto.request.enums.EducationRequirement;
import com.hirescript.api.dto.request.enums.Seniority;
import com.hirescript.api.dto.request.enums.TargetLength;
import com.hirescript.api.dto.request.enums.Tone;
import com.hirescript.api.dto.request.enums.WorkMode;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class JDRequest {

    @NotBlank(message = "jobTitle is required")
    @Size(max = 150, message = "jobTitle too long")
    private String jobTitle;

    @NotNull(message = "seniority is required")
    private Seniority seniority;

    private String department;

    @NotBlank(message = "location is required")
    private String location;

    @NotNull(message = "workMode is required")
    private WorkMode workMode;

    private String companyName;

    private String industry;

    private String templateId;

    private List<String> cultureKeywords;

    @NotEmpty(message = "mustHaveSkills is required")
    @Size(min = 1, max = 15, message = "max 15 must-have skills")
    private List<String> mustHaveSkills;

    @Size(max = 10, message = "max 10 nice-to-have skills")
    private List<String> niceToHaveSkills;

    private String yearsExperience;

    private EducationRequirement educationRequirement;

    @Min(value = 0, message = "salaryMin must be positive")
    @Max(value = 10_000_000, message = "salaryMin is unrealistic")
    private Integer salaryMin;

    @Min(value = 0, message = "salaryMax must be positive")
    @Max(value = 10_000_000, message = "salaryMax is unrealistic")
    private Integer salaryMax;

    @Pattern(regexp = "^[A-Za-z]{3}$", message = "salaryCurrency must be a 3-letter currency code")
    private String salaryCurrency;

    private List<String> benefits;

    private String growthOpportunity;

    @NotNull(message = "tone is required")
    private Tone tone;

    @NotNull(message = "targetLength is required")
    private TargetLength targetLength;

    private String targetPersona;

    @Size(max = 1000, message = "notes too long")
    private String notes;

}
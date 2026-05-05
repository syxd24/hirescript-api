package com.hirescript.api.ai;

import com.hirescript.api.dto.request.JDRequest;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dummy")
public class DummyAiClient implements AiClient {

    @Override
    public String generateJobDescription(JDRequest request) {
        return """
                Job Title: %s

                We are looking for a talented professional to join our team.

                Tone: %s
                Experience Level: %s

                This is a dummy response. Real AI content coming soon.
                """.formatted(
                request.getJobTitle(),
                request.getTone(),
                request.getYearsExperience()
        );
    }
}

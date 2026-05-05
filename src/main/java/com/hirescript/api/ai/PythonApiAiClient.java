package com.hirescript.api.ai;

import com.hirescript.api.dto.request.JDRequest;
import com.hirescript.api.dto.response.PythonJDResponse;
import com.hirescript.api.exception.AiGenerationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Component
@Profile("local")
public class PythonApiAiClient implements AiClient {

    private static final String GENERATE_JD_PATH = "/api/ai/jd/generate";
    private static final String INTERNAL_SECRET_HEADER = "x-internal-secret";

    private final RestClient restClient;
    private final String internalSecret;

    public PythonApiAiClient(
            @Value("${python.api.base-url}") String baseUrl,
            @Value("${python.api.internal-secret}") String internalSecret
    ) {
        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalStateException("python.api.base-url is required");
        }
        if (internalSecret == null || internalSecret.isBlank()) {
            throw new IllegalStateException("python.api.internal-secret is required");
        }

        this.restClient = RestClient.builder()
                .baseUrl(baseUrl)
                .build();
        this.internalSecret = internalSecret;
    }

    @Override
    public String generateJobDescription(JDRequest request) {
        PythonJDResponse response;
        try {
            response = restClient.post()
                    .uri(GENERATE_JD_PATH)
                    .header(INTERNAL_SECRET_HEADER, internalSecret)
                    .body(request)
                    .retrieve()
                    .body(PythonJDResponse.class);
        } catch (RestClientException ex) {
            throw new AiGenerationException("AI generation service is unavailable. Please try again.", ex);
        }

        if (response == null || response.getContent() == null || response.getContent().isBlank()) {
            throw new AiGenerationException("AI generation service returned empty content.");
        }

        return response.getContent();
    }
}

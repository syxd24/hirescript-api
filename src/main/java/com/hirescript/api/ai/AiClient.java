package com.hirescript.api.ai;

import com.hirescript.api.dto.request.JDRequest;

public interface AiClient {
    String generateJobDescription(JDRequest request);
}
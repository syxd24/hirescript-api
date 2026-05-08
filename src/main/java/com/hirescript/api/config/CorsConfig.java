package com.hirescript.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    private static final String LOCAL_FRONTEND_ORIGIN = "http://localhost:5173";

    @Value("${frontend.origin:}")
    private String frontendOrigin;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(getAllowedOrigins())
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }

    private String[] getAllowedOrigins() {
        List<String> allowedOrigins = new ArrayList<>();
        allowedOrigins.add(LOCAL_FRONTEND_ORIGIN);

        if (frontendOrigin != null && !frontendOrigin.isBlank()) {
            allowedOrigins.add(frontendOrigin.trim());
        }

        return allowedOrigins.toArray(new String[0]);
    }
}

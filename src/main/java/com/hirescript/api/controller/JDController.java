package com.hirescript.api.controller;

import com.hirescript.api.dto.request.JDRequest;
import com.hirescript.api.dto.response.JDResponse;
import com.hirescript.api.service.JDService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jd")
public class JDController {

    private final JDService jdService;

    public JDController(JDService jdService) {
        this.jdService = jdService;
    }

    @PostMapping("/generate")
    public ResponseEntity<JDResponse> generateJd(@Valid @RequestBody JDRequest request) {
        JDResponse response = jdService.generateJd(request);
        return ResponseEntity.ok(response);
    }
}
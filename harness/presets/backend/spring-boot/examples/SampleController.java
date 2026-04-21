package com.example.project.sample.api;

import com.example.project.sample.application.SampleService;
import com.example.project.sample.dto.CreateSampleRequest;
import com.example.project.sample.dto.SampleResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/samples")
public class SampleController {

    private final SampleService sampleService;

    public SampleController(SampleService sampleService) {
        this.sampleService = sampleService;
    }

    @GetMapping("/{id}")
    public SampleResponse get(@PathVariable Long id) {
        return sampleService.get(id);
    }

    @PostMapping
    public ResponseEntity<SampleResponse> create(@Valid @RequestBody CreateSampleRequest request) {
        SampleResponse created = sampleService.create(request);
        return ResponseEntity.created(URI.create("/api/v1/samples/" + created.id())).body(created);
    }
}

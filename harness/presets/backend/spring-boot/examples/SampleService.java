package com.example.project.sample.application;

import com.example.project.common.error.ErrorCode;
import com.example.project.common.error.NotFoundException;
import com.example.project.sample.domain.Sample;
import com.example.project.sample.dto.CreateSampleRequest;
import com.example.project.sample.dto.SampleResponse;
import com.example.project.sample.infra.SampleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class SampleService {

    private final SampleRepository sampleRepository;

    public SampleService(SampleRepository sampleRepository) {
        this.sampleRepository = sampleRepository;
    }

    public SampleResponse get(Long id) {
        Sample sample = sampleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCode.of("sample.not_found")));
        return SampleResponse.from(sample);
    }

    @Transactional
    public SampleResponse create(CreateSampleRequest request) {
        Sample sample = Sample.create(request.name(), request.priority());
        Sample persisted = sampleRepository.save(sample);
        return SampleResponse.from(persisted);
    }
}

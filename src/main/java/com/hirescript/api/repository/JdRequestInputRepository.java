package com.hirescript.api.repository;

import com.hirescript.api.entity.JdRequestInput;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JdRequestInputRepository extends JpaRepository<JdRequestInput, UUID> {
}
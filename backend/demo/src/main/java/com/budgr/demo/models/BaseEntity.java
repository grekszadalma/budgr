package com.budgr.demo.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class BaseEntity {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

package com.budgr.demo.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "savings")
@Entity
public class Saving {
    @Id
    @GeneratedValue
    private UUID id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToOne()
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference //user is not included in the expense JSON!!! stops infinite loops...
    private User user;

    private String location;

    private Double amount;

    private Double goalAmount;

    private String description;

    private LocalDateTime date;

    private Boolean isRecurring;
    private String category;
}

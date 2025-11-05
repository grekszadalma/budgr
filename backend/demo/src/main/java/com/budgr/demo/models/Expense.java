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
@Table(name = "expenses")
@Entity
public class Expense {

    @Id
    @GeneratedValue
    private UUID id;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToOne()
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-expenses") //user is not included in the expense JSON!!! stops infinite loops...
    private User user;

    private String company;
    private String location;

    private Double amount;

    private String description;

    private LocalDateTime date;

    private Boolean isRecurring;

    @ManyToOne()
    @JoinColumn(name = "budget_id")
    @JsonBackReference("budget-expenses")
    private Budget budget;

}

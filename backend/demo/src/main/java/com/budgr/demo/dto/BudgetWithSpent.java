package com.budgr.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor // ✅ important so JPA/JPQL constructor queries can use it
public class BudgetWithSpent {
    private UUID id;
    private String name;
    private Double amount;       // total budget
    private Double spentAmount;  // sum of expenses for this budget this month
}

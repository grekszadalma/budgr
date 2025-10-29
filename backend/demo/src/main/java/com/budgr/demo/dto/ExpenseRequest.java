package com.budgr.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseRequest {
    private String company;
    private Double amount;
    private String description;
    private String category; // will be used as budget name
}


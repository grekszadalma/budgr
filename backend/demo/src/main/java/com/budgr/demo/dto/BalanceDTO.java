package com.budgr.demo.dto;

public class BalanceDTO {
    private Long userId;

    private Long remainingBalance;

    // Constructors
    public BalanceDTO() {}

    public BalanceDTO(Long userId, Long remainingBalance) {
        this.userId = userId;
        this.remainingBalance = remainingBalance;
    }

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }



    public Long getRemainingBalance() { return remainingBalance; }
    public void setRemainingBalance(Long remainingBalance) { this.remainingBalance = remainingBalance; }
}

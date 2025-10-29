package com.budgr.demo.services;

import com.budgr.demo.dto.BudgetWithSpent;
import com.budgr.demo.models.Budget;
import com.budgr.demo.models.Expense;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.BudgetRepository;
import com.budgr.demo.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
public class BudgetService {

    private BudgetRepository budgetRepository;
    private ExpenseRepository expenseRepository;

    @Autowired
    public BudgetService(BudgetRepository budgetRepository, ExpenseRepository expenseRepository) {
        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
    }

    public List<Budget> getBudgetsByUser(User user) {
        return budgetRepository.findByUser(user);
    }

    public Budget createBudget(Budget budget) {

        budget.setCreationDate(LocalDateTime.now());

        return budgetRepository.save(budget);
    }

    public List<BudgetWithSpent> getBudgetsWithSpentForUser(User user) {
        // Fetch all budgets for the user
        List<Budget> budgets = budgetRepository.findByUser(user);


        LocalDateTime start = YearMonth.now().atDay(1).atStartOfDay();
        LocalDateTime end = YearMonth.now().atEndOfMonth().atTime(23, 59, 59);

        List<Expense> expenses = expenseRepository
                .findMonthlyExpensesByUserAndBudget(user.getId(), budgets.getFirst().getName(), start, end);
        System.out.println(expenses.size());
         // Map budgets to BudgetWithSpent DTOs
        return budgets.stream().map(budget -> {

            double spent = expenseRepository
                    .findMonthlyExpensesByUserAndBudget(user.getId(), budget.getName(), start, end)
                    .stream()
                    .mapToDouble(Expense::getAmount)
                    .sum();
            System.out.println(spent);

            return new BudgetWithSpent(
                    budget.getId(),
                    budget.getName(),
                    budget.getAmount(),
                    spent
            );
        }).toList();
    }



}

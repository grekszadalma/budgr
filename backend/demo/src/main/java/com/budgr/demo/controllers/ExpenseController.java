package com.budgr.demo.controllers;

import com.budgr.demo.dto.ExpenseRequest;
import com.budgr.demo.models.Budget;
import com.budgr.demo.models.Expense;
import com.budgr.demo.models.User;
import com.budgr.demo.services.CurrentUserService;
import com.budgr.demo.services.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://budgr.site",
        "https://www.budgr.site"
}, allowCredentials = "true")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final CurrentUserService currentUserService;

    public ExpenseController(ExpenseService expenseService, CurrentUserService currentUserService) {
        this.expenseService = expenseService;
        this.currentUserService = currentUserService;
    }

    @GetMapping("/me")
    public List<Expense> getUserExpenses() {
        User user = currentUserService.get();
        return expenseService.getExpencesByUser(user);
    }

    @PostMapping("/me")
    public Expense createExpense(@RequestBody ExpenseRequest request) {

        return expenseService.createExpense(request.getCompany(),request.getAmount(), request.getDescription(), request.getCategory());
    }

    // Optional: only for admins or testing, returns all expenses
    @GetMapping
    public List<Expense> findAll() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/monthly/me")
    public List<Expense> getCurrentUserMonthlyExpenses() {
        return expenseService.getExpensesForCurrentMonth();
    }

    @GetMapping("/monthly/me/by-budget/{budgetName}")
    public List<Expense> getCurrentUserExpensesByBudget(@PathVariable String budgetName) {
        return expenseService.getExpensesForBudgetThisMonth(budgetName);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable UUID id) {
        expenseService.removeExpense(id);
    }
}

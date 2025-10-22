package com.budgr.demo.controllers;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.User;
import com.budgr.demo.services.CurrentUserService;
import com.budgr.demo.services.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
    public Expense createExpense(@RequestBody Expense expense) {
        expense.setUser(currentUserService.get());
        return expenseService.createExpense(expense);
    }

    // Optional: only for admins or testing, returns all expenses
    @GetMapping
    public List<Expense> findAll() {
        return expenseService.getAllExpenses();
    }
}

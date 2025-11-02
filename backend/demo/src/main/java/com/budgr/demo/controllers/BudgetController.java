package com.budgr.demo.controllers;

import com.budgr.demo.dto.BudgetWithSpent;
import com.budgr.demo.models.Budget;
import com.budgr.demo.models.User;
import com.budgr.demo.services.BudgetService;
import com.budgr.demo.services.CurrentUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BudgetController {

    private BudgetService  budgetService;
    private CurrentUserService currentUserService;


    @Autowired
    public BudgetController(BudgetService budgetService, CurrentUserService currentUserService) {
        this.budgetService = budgetService;
        this.currentUserService = currentUserService;
    }

    @GetMapping("/me")
    public List<Budget> getUserBudgets() {
        User user = currentUserService.get();
        return budgetService.getBudgetsByUser(user);
    }

    @PostMapping("/me")
    public Budget createBudget(@RequestBody Budget budget) {
        budget.setUser(currentUserService.get());
        return budgetService.createBudget(budget);
    }

    @GetMapping("/me/with-spent")
    public List<BudgetWithSpent> getUserBudgetsWithSpent() {
        User user = currentUserService.get();
        return budgetService.getBudgetsWithSpentForUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable UUID id) {
        budgetService.removeBudget(id);
    }

}

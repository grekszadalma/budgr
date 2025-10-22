package com.budgr.demo.controllers;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.Income;
import com.budgr.demo.models.User;
import com.budgr.demo.services.CurrentUserService;
import com.budgr.demo.services.ExpenseService;
import com.budgr.demo.services.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
@CrossOrigin(origins = "*")
public class IncomeController {

    private IncomeService incomeService;
    private final CurrentUserService currentUserService;

    @Autowired
    public IncomeController(IncomeService incomeService, CurrentUserService currentUserService) {
        this.incomeService = incomeService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<Income> getAllIncomes() {
        return incomeService.getIncomes();
    }

    /*@PostMapping
    public Income createIncome(@RequestBody Income income) {
        return incomeService.createIncome(income);
    }*/

    @GetMapping("/me")
    public List<Income> getUserExpenses() {
        User user = currentUserService.get();
        return incomeService.getIncomesByUser(user);
    }

    @PostMapping("/me")
    public Income createExpense(@RequestBody Income income) {
        income.setUser(currentUserService.get());
        return incomeService.createIncome(income);
    }
}

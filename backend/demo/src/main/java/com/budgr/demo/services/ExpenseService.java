package com.budgr.demo.services;

import com.budgr.demo.models.Budget;
import com.budgr.demo.models.Expense;
import com.budgr.demo.models.Income;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.BudgetRepository;
import com.budgr.demo.repositories.ExpenseRepository;
import com.budgr.demo.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final BudgetRepository budgetRepository;
    private final CurrentUserService currentUserService;

    public ExpenseService(ExpenseRepository expenseRepository,
                          BudgetRepository budgetRepository,
                          CurrentUserService currentUserService) {
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
        this.currentUserService = currentUserService;
    }

    public Expense createExpense(String company, Double amount, String description, String category) {
        User user = currentUserService.get();

        Expense expense = new Expense();
        expense.setUser(user);
        expense.setCompany(company);
        expense.setAmount(amount);
        expense.setDescription(description);
        expense.setDate(LocalDateTime.now());

        // Use category as budget name
        System.out.println(category);
        if (category != null && !category.isBlank()) {
            Budget budget = budgetRepository.findByUserAndName(user, category)
                    .orElseThrow(() -> {
                        throw new RuntimeException("Budget not found");
                    });
            expense.setBudget(budget);
        }


        return expenseRepository.save(expense);
    }


    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getExpensesByUserEmail(String email) {
        return expenseRepository.findByUserEmail(email);
    }

    public List<Expense> getExpencesByUser(User user) {
        return expenseRepository.findAllByUser(user);
    }

    public List<Expense> getExpencesByUserByDate(User user) {
        return expenseRepository.findAllByUser(user);
    }

    public List<Expense> getExpensesForCurrentMonth() {
        var user = currentUserService.get(); // get current user
        LocalDate startDate = YearMonth.now().atDay(1);
        LocalDate endDate = YearMonth.now().atEndOfMonth();

        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59, 999_999_999);

        return expenseRepository.findMonthlyExpensesByUser(user.getId(), start, end);
    }

    public List<Expense> getExpensesForBudgetThisMonth(String budgetName) {
        var user = currentUserService.get();
        LocalDate startDate = YearMonth.now().atDay(1);
        LocalDate endDate = YearMonth.now().atEndOfMonth();

        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59, 999_999_999);

        return expenseRepository.findMonthlyExpensesByUserAndBudget(user.getId(), budgetName, start, end);
    }


}

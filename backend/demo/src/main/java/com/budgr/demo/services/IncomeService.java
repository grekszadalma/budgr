package com.budgr.demo.services;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.Income;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.ExpenseRepository;
import com.budgr.demo.repositories.IncomeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;

@Service
public class IncomeService {


    private IncomeRepository incomeRepository;
    private CurrentUserService currentUserService;


    @Autowired
    public IncomeService(IncomeRepository incomeRepository,  CurrentUserService currentUserService) {
        this.incomeRepository = incomeRepository;
        this.currentUserService = currentUserService;
    }


    public List<Income> getIncomes() {

        return incomeRepository.findAll();
    }

    public List<Income> getIncomesByUser() {
        User user = currentUserService.get();
        return incomeRepository.findAllByUser(user);
    }

    public List<Income> getIncomesForCurrentMonthByUser(User user) {

        LocalDate startDate = YearMonth.now().atDay(1);
        LocalDate endDate = YearMonth.now().atEndOfMonth();

        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(23, 59, 59, 999_999_999);

        return incomeRepository.findMonthlyIncomesByUser(user.getId(), start, end);
    }

    public Income createIncome(Income income) {

        income.setDate(LocalDateTime.now());
        return incomeRepository.save(income);
    }

    public Double sumIncomesByUserId(UUID userId) {
        return  incomeRepository.sumIncomesByUserId(userId);
    }


    @Transactional
    public void removeIncome(UUID id) {
        var user = currentUserService.get();
        incomeRepository.deleteIncomeByUserIdAndId(user.getId(), id);
    }


}

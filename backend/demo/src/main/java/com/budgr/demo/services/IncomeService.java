package com.budgr.demo.services;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.Income;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class IncomeService {


    private IncomeRepository incomeRepository;

    @Autowired
    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }


    public List<Income> getIncomes() {

        return incomeRepository.findAll();
    }

    public List<Income> getIncomesByUser(User user) {
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

    public Double sumIncomesByUserId(Long userId) {
        return  incomeRepository.sumIncomesByUserId(userId);
    }




}

package com.budgr.demo.services;

import com.budgr.demo.models.Income;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {


    private IncomeRepository incomeRepository;

    @Autowired
    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }


    public List<Income> getIncomes() {
        System.out.println("Here");
        return incomeRepository.findAll();
    }

    public List<Income> getIncomesByUser(User user) {
        return incomeRepository.findAllByUser(user);
    }

    public Income createIncome(Income income) {
        return incomeRepository.save(income);
    }

}

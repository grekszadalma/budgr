package com.budgr.demo.services;

import com.budgr.demo.dto.BalanceDTO;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.ExpenseRepository;
import com.budgr.demo.repositories.IncomeRepository;
import com.budgr.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, ExpenseRepository expenseRepository, IncomeRepository incomeRepository) {
        this.userRepository = userRepository;
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // encode here
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }




    public List<User> findAll() {
        return userRepository.findAll();
    }

    /*public Long getUserBalance(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        Long totalExpenses = expenseRepository.sumExpensesByUserId(userId);
        Long totalIncomes = incomeRepository.sumIncomesByUserId(userId);
        Long remaining = totalIncomes - totalExpenses;

        return remaining;
    }*/

    public User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}

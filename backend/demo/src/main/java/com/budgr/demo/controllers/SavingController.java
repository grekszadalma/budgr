package com.budgr.demo.controllers;

import com.budgr.demo.models.Income;
import com.budgr.demo.models.Saving;
import com.budgr.demo.models.User;
import com.budgr.demo.services.CurrentUserService;
import com.budgr.demo.services.IncomeService;
import com.budgr.demo.services.SavingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings")
@CrossOrigin(origins = "*")
public class SavingController {

    private SavingService savingService;
    private CurrentUserService currentUserService;


    @Autowired
    public SavingController(SavingService savingService, CurrentUserService currentUserService) {

        this.savingService = savingService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<Saving> getAllSavings() {
        return savingService.findAllSavings();
    }

    @PostMapping
    public Saving createIncome(@RequestBody Saving saving) {
        return savingService.createSaving(saving);
    }

    @GetMapping("/me")
    public List<Saving> getUserSavings() {
        User user = currentUserService.get();
        return savingService.getSavingsByUser(user);
    }

    @PostMapping("/me")
    public Saving createExpense(@RequestBody Saving saving) {
        saving.setUser(currentUserService.get());
        return savingService.createSaving(saving);
    }
}

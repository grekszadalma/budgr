package com.budgr.demo.services;

import com.budgr.demo.models.Saving;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.SavingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SavingService {

    private SavingRepository savingRepository;

    @Autowired
    public SavingService(SavingRepository savingRepository) {
        this.savingRepository = savingRepository;
    }

    public Saving createSaving(Saving saving) {
        return savingRepository.save(saving);
    }

    public List<Saving> findAllSavings() {
        return savingRepository.findAll();
    }

    public List<Saving> getSavingsByUser(User user) {
        return savingRepository.findAllByUser(user);
    }

    public Saving updateSaving(Long id, Double incomingAmount) throws RuntimeException {

        Optional<Saving> existing = savingRepository.findById(id);
        if(existing.isEmpty()) {
            throw new RuntimeException("Saving not found");
        }

        System.out.println(incomingAmount);
        Double amount = existing.get().getAmount()+incomingAmount;
        existing.get().setAmount(amount);
        return savingRepository.save(existing.get());

    }
}

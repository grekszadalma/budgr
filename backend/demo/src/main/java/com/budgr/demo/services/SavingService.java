package com.budgr.demo.services;

import com.budgr.demo.models.Income;
import com.budgr.demo.models.Saving;
import com.budgr.demo.models.User;
import com.budgr.demo.models.WishListItem;
import com.budgr.demo.repositories.SavingRepository;
import com.budgr.demo.repositories.WishListItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

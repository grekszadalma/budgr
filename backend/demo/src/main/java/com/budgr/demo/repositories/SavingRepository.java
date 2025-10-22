package com.budgr.demo.repositories;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.Saving;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingRepository extends JpaRepository<Saving, Long> {

    List<Saving> findAllByUser(User user);
}

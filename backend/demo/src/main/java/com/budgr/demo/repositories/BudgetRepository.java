package com.budgr.demo.repositories;

import com.budgr.demo.models.Budget;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BudgetRepository extends JpaRepository<Budget, UUID> {

    List<Budget> findByUser(User user);

    Optional<Budget> findByUserAndName(User user, String name);

    void deleteBudgetByUserIdAndId(UUID userId, UUID id);
}

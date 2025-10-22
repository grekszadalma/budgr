package com.budgr.demo.repositories;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.id = :userId")
    Long sumExpensesByUserId(@Param("userId") Long userId);

    List<Expense> findByUserEmail(String email);

    List<Expense> findAllByUser(User user);

}

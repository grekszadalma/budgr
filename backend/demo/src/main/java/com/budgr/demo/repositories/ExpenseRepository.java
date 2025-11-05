package com.budgr.demo.repositories;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, UUID> {

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.id = :userId")
    Long sumExpensesByUserId(@Param("userId") UUID userId);

    List<Expense> findByUserEmail(String email);

    List<Expense> findAllByUser(User user);

    // Expenses by user and current month
    @Query("""
        SELECT e FROM Expense e
        WHERE e.user.id = :userId
          AND e.date BETWEEN :start AND :end
    """)
    List<Expense> findMonthlyExpensesByUser(@Param("userId") UUID userId,
                                            @Param("start") LocalDateTime start,
                                            @Param("end") LocalDateTime end);

    // Expenses by budget and user
    @Query("""
        SELECT e FROM Expense e
        WHERE e.budget.name = :budgetName
          AND e.user.id = :userId
          AND e.date BETWEEN :start AND :end
    """)
    List<Expense> findMonthlyExpensesByUserAndBudget(@Param("userId") UUID userId,
                                                     @Param("budgetName") String budgetName,
                                                     @Param("start") LocalDateTime start,
                                                     @Param("end") LocalDateTime end);

    void deleteExpenseByUserIdAndId(UUID userId, UUID id);

}

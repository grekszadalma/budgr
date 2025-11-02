package com.budgr.demo.repositories;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.Income;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface IncomeRepository extends JpaRepository<Income, UUID> {

    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Income i WHERE i.user.id = :userId")
    Double sumIncomesByUserId(UUID userId);

    @Query("""
        SELECT i FROM Income i
        WHERE i.user.id = :userId
          AND i.date BETWEEN :start AND :end
    """)
    List<Income> findMonthlyIncomesByUser(@Param("userId") UUID userId,
                                            @Param("start") LocalDateTime start,
                                            @Param("end") LocalDateTime end);

    List<Income> findAllByUser(User user);

    void deleteIncomeByUserIdAndId(UUID userId, UUID id);
}

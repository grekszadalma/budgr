package com.budgr.demo.repositories;

import com.budgr.demo.models.Expense;
import com.budgr.demo.models.Saving;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SavingRepository extends JpaRepository<Saving, Long> {

    List<Saving> findAllByUser(User user);

    Optional<Saving> findById(Long id);

    @Query("""
        SELECT s FROM Saving s
        WHERE s.user.id = :userId
          AND s.date BETWEEN :start AND :end
    """)
    List<Saving> findMonthlySavingsByUser(@Param("userId") Long userId,
                                            @Param("start") LocalDateTime start,
                                            @Param("end") LocalDateTime end);
}

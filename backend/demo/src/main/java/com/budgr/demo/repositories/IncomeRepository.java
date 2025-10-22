package com.budgr.demo.repositories;

import com.budgr.demo.models.Income;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    @Query("SELECT COALESCE(SUM(i.amount), 0) FROM Income i WHERE i.user.id = :userId")
    Long sumIncomesByUserId(@Param("userId") Long userId);

    List<Income> findAllByUser(User user);
}

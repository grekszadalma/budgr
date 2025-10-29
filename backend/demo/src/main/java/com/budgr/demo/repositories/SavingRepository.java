package com.budgr.demo.repositories;

import com.budgr.demo.models.Saving;
import com.budgr.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavingRepository extends JpaRepository<Saving, Long> {

    List<Saving> findAllByUser(User user);

    Optional<Saving> findById(Long id);
}

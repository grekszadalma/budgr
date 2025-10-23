package com.budgr.demo.repositories;

import com.budgr.demo.models.User;
import com.budgr.demo.models.WishListItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishListItemRepository extends JpaRepository<WishListItem, Long> {

    List<WishListItem> findAllByUser(User user);
    Optional<WishListItem> findByNameAndCategory(String name, String category);
}

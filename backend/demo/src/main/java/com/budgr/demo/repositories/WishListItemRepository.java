package com.budgr.demo.repositories;

import com.budgr.demo.models.User;
import com.budgr.demo.models.WishListItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishListItemRepository extends JpaRepository<WishListItem, Long> {

    List<WishListItem> findAllByUser(User user);
}

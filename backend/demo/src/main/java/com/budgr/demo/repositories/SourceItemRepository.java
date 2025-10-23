package com.budgr.demo.repositories;

import com.budgr.demo.models.SourceItem;
import com.budgr.demo.models.WishListItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SourceItemRepository extends JpaRepository<SourceItem, Long> {

    List<SourceItem> findAllByWishListItem(WishListItem item);
    //Optional<SourceItem> findByWishlistItemAndSite(WishListItem item, String site);
}

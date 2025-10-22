package com.budgr.demo.services;

import com.budgr.demo.models.WishListItem;
import com.budgr.demo.repositories.WishListItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishListItemService {

    private WishListItemRepository wishListItemRepository;

    @Autowired
    public WishListItemService(WishListItemRepository wishListItemRepository) {
        this.wishListItemRepository = wishListItemRepository;
    }

    public WishListItem createWishListItem(WishListItem wishListItem) {
        return wishListItemRepository.save(wishListItem);
    }

    public List<WishListItem> findAllWishListItems() {
        return wishListItemRepository.findAll();
    }
}

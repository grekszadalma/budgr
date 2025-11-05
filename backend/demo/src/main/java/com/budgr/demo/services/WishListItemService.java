package com.budgr.demo.services;

import com.budgr.demo.models.User;
import com.budgr.demo.models.WishListItem;
import com.budgr.demo.repositories.BudgetRepository;
import com.budgr.demo.repositories.UserRepository;
import com.budgr.demo.repositories.WishListItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WishListItemService {

    private WishListItemRepository wishListItemRepository;
    private CurrentUserService currentUserService;


    @Autowired
    public WishListItemService(WishListItemRepository wishListItemRepository,  CurrentUserService currentUserService) {
        this.wishListItemRepository = wishListItemRepository;
        this.currentUserService = currentUserService;
    }

    public WishListItem createWishListItem(WishListItem wishListItem) {
        return wishListItemRepository.save(wishListItem);
    }

    public List<WishListItem> findAllWishListItems() {
        return wishListItemRepository.findAll();
    }

    @Transactional
    public void removeWishlistItem(UUID id) {
        User user = currentUserService.get();
        wishListItemRepository.deleteWishlistItemByUserIdAndId(user.getId(),id);
    }
}

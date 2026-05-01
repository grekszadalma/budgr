package com.budgr.demo.controllers;

import com.budgr.demo.models.User;
import com.budgr.demo.models.WishListItem;
import com.budgr.demo.services.CurrentUserService;
import com.budgr.demo.services.WishListItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/wlitems")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://d3ff8ih0471bsz.cloudfront.net"
}, allowCredentials = "true")
public class WishListItemController {

    private WishListItemService wishListItemService;
    private CurrentUserService currentUserService;

    @Autowired
    public WishListItemController(WishListItemService wishListItemService, CurrentUserService currentUserService) {
        this.wishListItemService = wishListItemService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<WishListItem> getWishListItems() {
        return wishListItemService.findAllWishListItems();
    }

    @PostMapping
    public WishListItem createWishListItem(@RequestBody WishListItem wishListItem) {
        return wishListItemService.createWishListItem(wishListItem);
    }

    @GetMapping("/me")
    public List<WishListItem> getCurrentUserWishListItem() {
        return wishListItemService.findAllWishListItems();
    }

    @PostMapping("/me")
    public WishListItem createCurrentUserWishListItem(@RequestBody WishListItem wishListItem) {
        User user = currentUserService.get();
        wishListItem.setUser(user);
        return wishListItemService.createWishListItem(wishListItem);
    }

    @DeleteMapping("/{id}")
    public void deleteWishlistItem(@PathVariable UUID id) {
        wishListItemService.removeWishlistItem(id);
    }

}

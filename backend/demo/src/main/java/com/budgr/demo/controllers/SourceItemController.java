package com.budgr.demo.controllers;

import com.budgr.demo.models.SourceItem;
import com.budgr.demo.services.SourceItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist/items")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://budgr.site",
        "https://www.budgr.site"
}, allowCredentials = "true")
public class SourceItemController {

    private SourceItemService sourceItemService;

    @Autowired
    public SourceItemController(SourceItemService sourceItemService) {
        this.sourceItemService = sourceItemService;
    }

    @GetMapping("/prices")
    public ResponseEntity<List<SourceItem>> getPrices(@RequestParam String itemName,
                                                      @RequestParam String category) {
        List<SourceItem> prices = sourceItemService.getPricesForItem(itemName,category);
        if (prices.isEmpty()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(prices);
    }


}

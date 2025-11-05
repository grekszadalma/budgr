package com.budgr.demo.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sourceitems")
public class SourceItem {

    @Id
    @GeneratedValue
    private UUID id;


    private String productUrl;
    private String price;
    private LocalDateTime lastUpdated;

    @ManyToOne
    @JoinColumn(name = "wishlist_item_id")
    @JsonBackReference
    private WishListItem wishListItem;
}

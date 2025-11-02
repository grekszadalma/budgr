package com.budgr.demo.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "wlitems")
public class WishListItem {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String category;

    @ManyToOne()
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;


    @OneToMany(mappedBy = "wishListItem")
    @JsonManagedReference
    private List<SourceItem> sources;

}

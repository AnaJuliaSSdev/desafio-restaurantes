package com.db.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "restaurants")
@Entity(name = "restaurants")
@EqualsAndHashCode(of = "id")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String name;

    public Restaurant(String name) {
        this.name = name;
    }
}

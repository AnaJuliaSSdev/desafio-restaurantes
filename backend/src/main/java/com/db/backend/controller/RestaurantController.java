package com.db.backend.controller;

import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.RestaurantRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("restaurant")
public class RestaurantController {
    @Autowired
    private RestaurantRepository repository;
    @PostMapping("/create")
    public ResponseEntity<Void> createRestaurant(@RequestBody @Valid RestaurantDTO data) {
        Restaurant restaurant = new Restaurant(data.name().trim());
        this.repository.save(restaurant);
        return ResponseEntity.ok().build();
    }
}

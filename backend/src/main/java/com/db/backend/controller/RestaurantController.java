package com.db.backend.controller;

import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Restaurant;
import com.db.backend.service.RestaurantService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;

@RestController
@RequestMapping("restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/create")
    public ResponseEntity<Long> createRestaurant(@RequestBody @Valid RestaurantDTO data) throws Exception {
        try {
            Long restaurantId = this.restaurantService.createRestaurant(data);
            return new ResponseEntity<>(restaurantId, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/getByFreeToVote/{isFreeToVote}")
    public ResponseEntity<Collection<Restaurant>> getByFreeToVote(@PathVariable boolean isFreeToVote) throws Exception {
        try {
            Collection<Restaurant> restaurants = this.restaurantService.getByFreeToVote(isFreeToVote);
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

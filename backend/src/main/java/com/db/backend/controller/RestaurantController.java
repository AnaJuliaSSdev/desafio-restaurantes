package com.db.backend.controller;

import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Restaurant;
import com.db.backend.service.RestaurantService;
import com.db.backend.service.VotingService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private VotingService votingService;

    @PostMapping("/create")
    public ResponseEntity<Long> createRestaurant(@RequestBody @Valid RestaurantDTO data) {
        Long restaurantId = this.restaurantService.saveRestaurant(data);
        return new ResponseEntity<>(restaurantId, HttpStatus.CREATED);
    }

    @GetMapping("/getByFreeToVote/{isFreeToVote}")
    public ResponseEntity<Collection<Restaurant>> getByFreeToVote(@PathVariable boolean isFreeToVote) {
        Collection<Restaurant> restaurants = this.restaurantService.getByFreeToVote(isFreeToVote);
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }
    
}

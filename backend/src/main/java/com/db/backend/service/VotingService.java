package com.db.backend.service;

import com.db.backend.entity.Restaurant;
import com.db.backend.entity.Voting;
import com.db.backend.repository.VotingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class VotingService {

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    VotingRepository repository;

    public void createVoting() {
        Collection<Restaurant> restaurants = restaurantService.getByFreeToVote(true);
        Voting voting = new Voting(restaurants);
        this.repository.save(voting);
    }

    public Collection<Voting> getAllVoting() {
        return this.repository.findAll();
    }
}

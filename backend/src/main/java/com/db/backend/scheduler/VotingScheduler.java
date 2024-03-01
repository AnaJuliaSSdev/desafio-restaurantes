package com.db.backend.scheduler;

import com.db.backend.entity.Restaurant;
import com.db.backend.service.RestaurantService;
import com.db.backend.service.VotingService;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class VotingScheduler {
    @Autowired
    private VotingService votingService;

    @Autowired
    private RestaurantService restaurantService;

    @Scheduled(fixedDelay = 1000 * 10)
    public void scheduledTask() {
        Collection<Restaurant> restaurants = restaurantService.getByFreeToVote(true);
        System.out.println(restaurants.toString());
    }
}

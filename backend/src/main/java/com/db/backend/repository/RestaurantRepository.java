package com.db.backend.repository;

import com.db.backend.entity.Restaurant;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Collection<Restaurant> findByFreeToVote(boolean isFreeToVote);
}   

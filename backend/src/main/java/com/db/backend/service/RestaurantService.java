package com.db.backend.service;

import com.db.backend.dto.AdressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Adress;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.AdressRepository;
import com.db.backend.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AdressRepository adressRepository;

    public Long saveRestaurant(RestaurantDTO restaurantDTO) {
        // Saving Adress
        AdressDTO adressDTO = restaurantDTO.adress();
        Adress adress = new Adress(adressDTO.cep(), adressDTO.street(), adressDTO.neighborhood(), adressDTO.locale(),
                adressDTO.uf(), adressDTO.locationNumber());
        Adress savedAdress = this.adressRepository.save(adress);

        // Saving Restaurant with Adress
        Restaurant restaurant = new Restaurant(restaurantDTO.name(), restaurantDTO.description(),
                restaurantDTO.description(), savedAdress);
        Restaurant savedRestaurant = this.restaurantRepository.save(restaurant);
        return savedRestaurant.getId();
    }

    public Collection<Restaurant> getAllRestaurants() {
        Collection<Restaurant> restaurants = this.restaurantRepository.findAll();
        return restaurants;
    }

    public Collection<Restaurant> getByFreeToVote(boolean isFreeToVote) {
        Collection<Restaurant> restaurants = this.restaurantRepository.findByFreeToVote(isFreeToVote);

        ArrayList<Restaurant> sortedRestaurants = new ArrayList<>(restaurants);
        Collections.sort(sortedRestaurants, Comparator.comparingInt(Restaurant::getVotes).reversed());

        return sortedRestaurants;
    }
}

package com.db.backend.service;

import com.db.backend.dto.AddressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Address;
import com.db.backend.entity.Restaurant;
import com.db.backend.entity.Voting;
import com.db.backend.repository.AddressRepository;
import com.db.backend.repository.RestaurantRepository;
import com.db.backend.repository.VotingRepository;

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
    private AddressRepository addressRepository;

    @Autowired
    private VotingRepository votingRepository;

    public Long createRestaurant(RestaurantDTO restaurantDTO) throws Exception {
        try {
            AddressDTO addressDTO = restaurantDTO.address();
            Address address = new Address(addressDTO.cep(), addressDTO.street(), addressDTO.neighborhood(),
                    addressDTO.locale(),
                    addressDTO.uf(), addressDTO.locationNumber(), addressDTO.complement());
            Address savedAddress = this.addressRepository.save(address);

            Restaurant restaurant = new Restaurant(restaurantDTO.name(), restaurantDTO.description(),
                    restaurantDTO.website(), savedAddress);
            Restaurant savedRestaurant = this.restaurantRepository.save(restaurant);

            Voting openVoting = votingRepository.findByIsOpen(true);

            if (openVoting != null) {
                openVoting.addRestaurant(restaurant);
                votingRepository.save(openVoting);
            }

            return savedRestaurant.getId();
        } catch (Exception e) {
            throw new Exception("Unable to create the restaurant.");
        }
    }

    public Collection<Restaurant> getAllRestaurants() {
        Collection<Restaurant> restaurants = this.restaurantRepository.findAll();
        return restaurants;
    }

    public Collection<Restaurant> getByFreeToVote(boolean isFreeToVote) throws Exception {
        try {
            Collection<Restaurant> restaurants = this.restaurantRepository.findByFreeToVote(isFreeToVote);

            ArrayList<Restaurant> sortedRestaurants = new ArrayList<>(restaurants);
            Collections.sort(sortedRestaurants, Comparator.comparingInt(Restaurant::getVotes).reversed());
            return sortedRestaurants;
        } catch (Exception e) {
            throw new Exception("Unable to find restaurants.");
        }
    }
}

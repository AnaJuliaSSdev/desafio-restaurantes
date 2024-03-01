package com.db.backend.service;

import com.db.backend.entity.Restaurant;
import com.db.backend.entity.User;
import com.db.backend.entity.Voting;
import com.db.backend.repository.RestaurantRepository;
import com.db.backend.repository.UserRepository;
import com.db.backend.repository.VotingRepository;

import org.springframework.http.HttpStatus;
import lombok.NonNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class VotingService {

    @Autowired
    RestaurantService restaurantService;

    @Autowired
    VotingRepository repository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    public void createVoting() {
        Collection<Restaurant> restaurants = restaurantService.getByFreeToVote(true);
        Voting voting = new Voting(restaurants);
        this.repository.save(voting);
    }

    public Collection<Voting> getAllVoting() {
        return this.repository.findAll();
    }

    public ResponseEntity<String> userVote(@NonNull Long idUser, @NonNull Long idRestaurant) {
        User user = userRepository.findById(idUser)
                .orElse(null);

        Restaurant restaurant = restaurantRepository.findById(idRestaurant)
                .orElse(null);

        if (user == null || restaurant == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        processVote(user, restaurant);

        userRepository.save(user);
        restaurantRepository.save(restaurant);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void processVote(User user, Restaurant restaurant) {
        Long alreadyVotedId = user.getRestaurantVoted();
        Long restaurantId = restaurant.getId();

        if (alreadyVotedId != null && alreadyVotedId.equals(restaurantId)) {
            user.setRestaurantVoted(null);
            restaurant.decreaseVotes();
        } else {
            Restaurant alreadyVotedRestaurant = alreadyVotedId != null ? restaurantRepository.findById(alreadyVotedId)
                    .orElse(null) : null;
            if (alreadyVotedRestaurant != null) {
                alreadyVotedRestaurant.decreaseVotes();
                restaurantRepository.save(alreadyVotedRestaurant);
            }
            restaurant.increaseVotes();
            user.setRestaurantVoted(restaurant.getId());
        }
    }
}

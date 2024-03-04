package com.db.backend.service;

import com.db.backend.entity.Restaurant;
import com.db.backend.entity.User;
import com.db.backend.entity.Voting;
import com.db.backend.repository.RestaurantRepository;
import com.db.backend.repository.UserRepository;
import com.db.backend.repository.VotingRepository;

import lombok.NonNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Optional;

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

    @Autowired
    VotingRepository votingRepository;

    public void createVoting() throws Exception {
        if (verifyVotingsDay()) {
            throw new Exception("Limit of one vote per day has been reached.");
        }

        Collection<Restaurant> restaurants = restaurantService.getByFreeToVote(true);
        Voting voting = new Voting(restaurants);
        this.repository.save(voting);
    }

    public boolean verifyVotingsDay() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        Optional<Voting> openVoting = votingRepository.findFirstByStartDateBetweenOrderByStartDateDesc(startOfDay,
                endOfDay);

        return openVoting.isPresent() && openVoting.get().getStartDate().toLocalDate().equals(today);
    }

    public Collection<Voting> getAllVoting() {
        return this.repository.findAll();
    }

    public void userVote(@NonNull Long idUser, @NonNull Long idRestaurant) throws Exception {
        User user = userRepository.findById(idUser)
                .orElse(null);

        Restaurant restaurant = restaurantRepository.findById(idRestaurant)
                .orElse(null);

        if (user == null || restaurant == null) {
            throw new Exception("Invalid ID provided.");
        }

        processVote(user, restaurant);

        userRepository.save(user);
        restaurantRepository.save(restaurant);
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

    public void closeOpenVoting() throws Exception {
        Voting voting = votingRepository.findByIsOpen(true);
        try {
            if (voting != null) {
                voting.setOpen(false);
                votingRepository.save(voting);
            }
        } catch (Exception e) {
            throw new Exception("Unable to close the voting.");
        }
    }
}

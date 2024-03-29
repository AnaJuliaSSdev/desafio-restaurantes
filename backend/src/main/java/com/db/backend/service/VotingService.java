package com.db.backend.service;

import com.db.backend.converter.VotingConverter;
import com.db.backend.dto.VotingDTO;
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
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.List;

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
        votingRepository.save(voting);
    }

    public boolean verifyVotingsDay() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        Voting openVoting = votingRepository.findFirstByStartDateBetweenOrderByStartDateDesc(startOfDay,
                endOfDay);

        return openVoting != null && openVoting.getStartDate().toLocalDate().equals(today);
    }

    public Collection<VotingDTO> getAllVoting() {
        VotingConverter votingConverter = new VotingConverter();

        Collection<VotingDTO> votingDTOs = new ArrayList<>();
        for (Voting voting : this.repository.findAll()) {
            VotingDTO votingDTO = votingConverter.convertEntityToDto(voting);
            votingDTOs.add(votingDTO);
        }

        return votingDTOs;

    }

    public void userVote(@NonNull Long idUser, @NonNull Long idRestaurant) throws Exception {
        User user = userRepository.findById(idUser)
                .orElse(null);

        Voting openVoting = votingRepository.findByIsOpen(true);

        if (openVoting == null) {
            throw new Exception("There is no open voting.");
        }

        Collection<Restaurant> restaurants = openVoting.getRestaurants();

        if (restaurants == null) {
            throw new Exception("There is no restaurants in this voting.");
        }

        Restaurant restaurant = restaurants.stream()
                .filter(r -> r.getId().equals(idRestaurant))
                .findFirst().orElseThrow(() -> new Exception("Restaurant not registered in this voting."));

        if (user == null || restaurant == null) {
            throw new Exception("Invalid ID provided.");
        }

        if (restaurant.isFreeToVote() == false) {
            throw new Exception("Restaurant not avaliable to vote.");
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

    public void closeOpenVoting(Voting voting) throws Exception {
        try {
            if (voting != null) {
                voting.setOpen(false);
                votingRepository.save(voting);
            }
        } catch (Exception e) {
            throw new Exception("Unable to close the voting.");
        }
    }

    public Restaurant verifyWinner(Voting voting) throws Exception {
        try {
            if (voting == null) {
                throw new Exception("No open voting found.");
            }

            Collection<Restaurant> restaurants = voting.getRestaurants();

            for (Restaurant restaurant : restaurants) {
                System.out.println("Restaurante ID: " + restaurant.getId() + ", Votos: " + restaurant.getVotes());
            }

            if (restaurants.isEmpty()) {
                throw new Exception("No restaurants are registered in this voting.");
            }

            List<Restaurant> sortedRestaurants = restaurants.stream()
                    .sorted(Comparator.comparingInt(Restaurant::getVotes).reversed())
                    .collect(Collectors.toList());

            Restaurant winner = sortedRestaurants.get(0);

            voting.setWinner(winner.toString());

            return winner;

        } catch (Exception e) {
            throw new Exception("Failed to set a winner" + e.getMessage());
        }
    }

    public void calculateAvaliableIn(Restaurant currentWinner) {
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime avaliableIn = currentDate.plusWeeks(1);

        currentWinner.setAvaliableIn(avaliableIn);
        currentWinner.setFreeToVote(false);
        restaurantRepository.save(currentWinner);
    }

    public void verifyAvaliableIn() {
        LocalDate currentDate = LocalDate.now();
        Collection<Restaurant> restaurants = restaurantRepository.findByFreeToVote(false);

        restaurants.stream()
                .filter(restaurant -> restaurant.getAvaliableIn().toLocalDate().equals(currentDate))
                .forEach(restaurant -> {
                    restaurant.setAvaliableIn(null);
                    restaurant.setFreeToVote(true);
                    restaurantRepository.save(restaurant);
                });
    }

    public void resetVotes(Voting voting) {
        Collection<Restaurant> restaurants = voting.getRestaurants();
        restaurants.stream().forEach(Restaurant::resetVotes);
    }

    public void closeVoting(Voting voting) {
        voting.setOpen(false);
        votingRepository.save(voting);
    }

    public VotingDTO getByIsOpen(boolean isOpen) throws Exception {
        Voting openVoting = votingRepository.findByIsOpen(isOpen);
        if (openVoting == null) {
            throw new Exception("There is no open voting.");
        }
        return new VotingConverter().convertEntityToDto(openVoting);
    }
}

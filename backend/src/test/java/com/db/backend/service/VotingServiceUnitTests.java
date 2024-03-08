package com.db.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;
import java.util.Collection;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.db.backend.entity.Restaurant;
import com.db.backend.entity.User;
import com.db.backend.entity.Voting;
import com.db.backend.repository.RestaurantRepository;
import com.db.backend.repository.UserRepository;
import com.db.backend.repository.VotingRepository;

@SpringBootTest
class VotingServiceUnitTests {

  @Mock
  private VotingRepository votingRepository;

  @InjectMocks
  private VotingService votingService;

  @Mock
  private RestaurantService restaurantService;

  @Mock
  private RestaurantRepository restaurantRepository;

  @Mock
  private UserRepository userRepository;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void userVote_Success() throws Exception {
    User user = mock(User.class);
    when(user.getId()).thenReturn(1L);
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));

    Restaurant restaurant = mock(Restaurant.class);
    when(restaurant.getId()).thenReturn(1L);
    when(restaurant.isFreeToVote()).thenReturn(true);

    Voting openVoting = new Voting();
    Collection<Restaurant> restaurants = new ArrayList<>();
    restaurants.add(restaurant);
    openVoting.setRestaurants(restaurants);
    when(votingRepository.findByIsOpen(true)).thenReturn(openVoting);

    votingService.userVote(1L, 1L);

    verify(restaurant, times(1)).increaseVotes();
  }

  @Test
  void userVote_RestaurantNotAvailable() {
    User user = mock(User.class);
    when(userRepository.findById(1L)).thenReturn(Optional.of(user));

    Restaurant restaurant = mock(Restaurant.class);
    when(restaurant.getId()).thenReturn(1L);
    when(restaurant.isFreeToVote()).thenReturn(false);

    Voting openVoting = mock(Voting.class);

    Collection<Restaurant> restaurants = new ArrayList<>();
    restaurants.add(restaurant);
    openVoting.setRestaurants(restaurants);
    when(openVoting.getRestaurants()).thenReturn(restaurants);
    when(votingRepository.findByIsOpen(true)).thenReturn(openVoting);

    Exception exception = assertThrows(Exception.class, () -> votingService.userVote(1L, 1L));
    assertTrue(exception.getMessage().contains("Restaurant not avaliable to vote."));
    verify(restaurant, never()).increaseVotes();
  }

  @Test
  void createVoting_Success() throws Exception {
    Collection<Restaurant> restaurants = new ArrayList<>();

    Voting savedVoting = mock(Voting.class);

    when(votingRepository.findFirstByStartDateBetweenOrderByStartDateDesc(any(LocalDateTime.class),
        any(LocalDateTime.class)))
        .thenReturn(null);

    when(restaurantService.getByFreeToVote(true)).thenReturn(restaurants);

    when(votingRepository.save(any(Voting.class))).thenReturn(savedVoting);

    votingService.createVoting();

    verify(votingRepository, times(1)).save(any(Voting.class));
  }

  @Test
  void createVoting_LimitReached() throws Exception {
    Collection<Restaurant> restaurants = Collections.emptyList();
    Voting openVoting = new Voting();

    when(restaurantService.getByFreeToVote(true)).thenReturn(restaurants);

    when(votingRepository.findFirstByStartDateBetweenOrderByStartDateDesc(any(LocalDateTime.class),
        any(LocalDateTime.class)))
        .thenReturn(openVoting);

    assertThrows(Exception.class, votingService::createVoting);
    verify(votingRepository, times(1)).findFirstByStartDateBetweenOrderByStartDateDesc(any(LocalDateTime.class),
        any(LocalDateTime.class));
  }

  @Test
  void verifyVotingsDay_NoOpenVoting() {
    when(votingRepository.findFirstByStartDateBetweenOrderByStartDateDesc(any(LocalDateTime.class),
        any(LocalDateTime.class)))
        .thenReturn(null);

    assertFalse(votingService.verifyVotingsDay());
  }

  @Test
  void verifyVotingsDay_OpenVotingToday() {
    LocalDate today = LocalDate.now();
    LocalDateTime startOfDay = today.atStartOfDay();
    LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

    Voting openVoting = new Voting(null);
    openVoting.setStartDate(startOfDay);

    when(votingRepository.findFirstByStartDateBetweenOrderByStartDateDesc(startOfDay, endOfDay))
        .thenReturn(openVoting);

    assertTrue(votingService.verifyVotingsDay());
  }

  @Test
  void verifyWinner() throws Exception {
    Restaurant restaurant1 = mock(Restaurant.class);
    Restaurant restaurant2 = mock(Restaurant.class);

    Voting openVoting = new Voting();
    Collection<Restaurant> restaurants = new ArrayList<>();
    restaurants.add(restaurant1);
    restaurants.add(restaurant2);
    openVoting.setRestaurants(restaurants);

    when(restaurant1.getVotes()).thenReturn(1);
    when(restaurant2.getVotes()).thenReturn(2);

    Restaurant winner = votingService.verifyWinner(openVoting);

    assertEquals(restaurant2, winner);
  }

  @Test
  void calculateAvaliableIn() {
    Restaurant currentWinner = mock(Restaurant.class);

    LocalDateTime expectedAvaliableIn = LocalDateTime.now().plusWeeks(1);
    when(currentWinner.getAvaliableIn()).thenReturn(expectedAvaliableIn);

    votingService.calculateAvaliableIn(currentWinner);

    assertFalse(currentWinner.isFreeToVote());
    verify(restaurantRepository, times(1)).save(currentWinner);
  }

}

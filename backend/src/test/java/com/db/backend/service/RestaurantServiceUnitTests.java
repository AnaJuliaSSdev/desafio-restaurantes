package com.db.backend.service;

import org.springframework.boot.test.context.SpringBootTest;

import com.db.backend.repository.RestaurantRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;

@SpringBootTest
public class RestaurantServiceUnitTests {
  @Mock
  private RestaurantRepository restaurantRepository;

  @InjectMocks
  private RestaurantService restaurantService;

}

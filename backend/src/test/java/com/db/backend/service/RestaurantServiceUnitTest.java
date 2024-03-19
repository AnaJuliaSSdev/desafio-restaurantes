package com.db.backend.service;

import com.db.backend.converter.RestaurantConverter;
import com.db.backend.dto.AddressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Address;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class RestaurantServiceUnitTest {
    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @BeforeEach
    public void cleanDataBase() {
        this.restaurantRepository.deleteAll();
    }

    @Test
    public void createRestaurantTest() throws Exception {
        AddressDTO addressDTO = new AddressDTO("58085370", "Rua Abel da silva", "Cruz das Armas", "João Pessoa", "PB", "649", "");
        RestaurantDTO restaurantDTO = new RestaurantDTO("Subway lulu", "Cookies do subway", "https://youtube.com", addressDTO);
        Long restaurantId = this.restaurantService.createRestaurant(restaurantDTO);

        assertEquals(1L, restaurantId, "Creating Restaurant");
    }

    @Test
    public void getRestaurantsByFreeToVote() throws Exception {
        RestaurantConverter restaurantConverter = new RestaurantConverter();

        Address address = new Address("58085370", "Rua Abel da silva", "Cruz das Armas", "João Pessoa", "PB", "649", "");
        Restaurant restaurantTrue = new Restaurant("Subway lulu", "Cookies do subway", "https://youtube.com", address);

        RestaurantDTO restaurantDTOTrue = restaurantConverter.convertEntityToDto(restaurantTrue);

        this.restaurantService.createRestaurant(restaurantDTOTrue);
        Collection<Restaurant> restaurantsFreeToVote = this.restaurantService.getByFreeToVote(true);
        int restaurantsLength = restaurantsFreeToVote.size();
        assertEquals(1, restaurantsLength, "Get Restaurants Where freeToVote is true");

        Collection<Restaurant> restaurantsNotFreeToVote = this.restaurantService.getByFreeToVote(false);
        int restaurantNotFreeVote = restaurantsNotFreeToVote.size();
        assertEquals(0, restaurantNotFreeVote, "Get Restaurants Where freeToVote is false");
    }
}

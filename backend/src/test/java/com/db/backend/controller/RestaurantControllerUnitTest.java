package com.db.backend.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Collection;

import static org.hamcrest.Matchers.hasSize;

import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import com.db.backend.dto.AddressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Address;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.AddressRepository;
import com.db.backend.repository.RestaurantRepository;
import com.db.backend.repository.VotingRepository;
import com.db.backend.service.RestaurantService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
class RestaurantControllerUnitTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RestaurantService restaurantService;

    @MockBean
    private RestaurantRepository restaurantRepository;

    @MockBean
    private AddressRepository addressRepository;

    @MockBean
    private VotingRepository votingRepository;

    @Test
    @WithMockUser(username = "user", roles = { "USER" })
    void createRestaurantSuccess() throws Exception {
        AddressDTO addressDTO = new AddressDTO("01001000", "Praça da Sé", "Sé", "São Paulo", "SP", "20", "complement");
        Address address = new Address("01001000", "Praça da Sé", "Sé", "São Paulo", "SP", "20", "complement");

        Restaurant restaurant = new Restaurant("name", "description", "website", address);
        RestaurantDTO restaurantDTO = new RestaurantDTO("name", "description", "website", addressDTO);

        when(addressRepository.save(any(Address.class))).thenReturn(address);
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(restaurant);

        mockMvc.perform(post("/restaurant/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(convertToJson(restaurantDTO))).andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(username = "user", roles = { "USER" })
    void getByFreeToVote() throws Exception {
        Restaurant restaurant = mock(Restaurant.class);
        when(restaurant.getId()).thenReturn(1L);
        when(restaurant.isFreeToVote()).thenReturn(true);

        Collection<Restaurant> restaurants = new ArrayList<>();
        restaurants.add(restaurant);

        when(restaurantService.getByFreeToVote(true)).thenReturn(restaurants);

        mockMvc.perform(get("/restaurant/getByFreeToVote/true")).andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("[0].id").value(restaurant.getId()));
    }

    private String convertToJson(Object object) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper.writeValueAsString(object);
    }
}

package com.db.backend.controller;

import com.db.backend.dto.AdressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Adress;
import com.db.backend.entity.Restaurant;
import com.db.backend.infra.security.JwtService;
import com.db.backend.repository.AdressRepository;
import com.db.backend.repository.RestaurantRepository;
import jakarta.validation.Valid;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private AdressRepository adressRepository;

    @PostMapping("/create")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody @Valid RestaurantDTO data) {
        AdressDTO adressDTO = data.adress();

        Adress adress = new Adress(adressDTO.cep(), adressDTO.street(), adressDTO.neighborhood(), adressDTO.locale(),
                adressDTO.uf());
        Adress adressSaved = this.adressRepository.save(adress);

        Restaurant restaurant = new Restaurant(data.name().trim(), data.description().trim(), data.website().trim(),
                adressSaved);
        this.restaurantRepository.save(restaurant);
        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Collection<Restaurant>> getAll() {
        Collection<Restaurant> restaurants = this.restaurantRepository.findAll();
        return new ResponseEntity<>(restaurants, HttpStatus.OK);
    }
}

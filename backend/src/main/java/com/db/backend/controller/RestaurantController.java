package com.db.backend.controller;

import com.db.backend.dto.AdressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Adress;
import com.db.backend.entity.Restaurant;
import com.db.backend.repository.AdressRepository;
import com.db.backend.repository.RestaurantRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<Void> createRestaurant(@RequestBody @Valid RestaurantDTO data) {
        String name = data.name().trim();
        String description = data.description().trim();
        String website = data.website().trim();
        AdressDTO adressDTO = data.adress();

        if (name.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        if (description.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Adress adress = new Adress(adressDTO.cep(), adressDTO.street(), adressDTO.neighborhood(), adressDTO.locale(), adressDTO.uf());
        Adress adressSaved = this.adressRepository.save(adress);

        Restaurant restaurant = new Restaurant(name, description, website, adressSaved);
        this.restaurantRepository.save(restaurant);
        return ResponseEntity.ok().build();
    }
}

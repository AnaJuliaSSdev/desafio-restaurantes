package com.db.backend.converter;

import org.springframework.stereotype.Component;

import com.db.backend.dto.AdressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Adress;
import com.db.backend.entity.Restaurant;

@Component
public class RestaurantConverter {

  public RestaurantDTO convertEntityToDto(Restaurant restaurant) {
    Adress adress = restaurant.getAdress();
    AdressDTO addressDTO = new AdressDTO(adress.getCep(), adress.getStreet(), adress.getNeighborhood(),
        adress.getLocale(), adress.getUf(), adress.getLocationNumber());
    return new RestaurantDTO(restaurant.getName(), restaurant.getDescription(), restaurant.getWebsite(), addressDTO);
  }
}

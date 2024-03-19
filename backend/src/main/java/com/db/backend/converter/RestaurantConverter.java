package com.db.backend.converter;

import org.springframework.stereotype.Component;

import com.db.backend.dto.AddressDTO;
import com.db.backend.dto.RestaurantDTO;
import com.db.backend.entity.Address;
import com.db.backend.entity.Restaurant;

@Component
public class RestaurantConverter {

  public RestaurantDTO convertEntityToDto(Restaurant restaurant) {
    Address address = restaurant.getAddress();
    AddressDTO addressDTO = new AddressDTO(address.getCep(), address.getStreet(), address.getNeighborhood(),
        address.getLocale(), address.getUf(), address.getLocationNumber(), address.getComplement());
    return new RestaurantDTO(restaurant.getName(), restaurant.getDescription(), restaurant.getWebsite(), addressDTO);
  }
}

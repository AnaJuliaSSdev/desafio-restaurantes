package com.db.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record RestaurantDTO(@NotEmpty String name, @NotEmpty String description, String website,
        @NotNull AddressDTO address) {

}

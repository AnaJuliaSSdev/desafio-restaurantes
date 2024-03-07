package com.db.backend.dto;

import jakarta.validation.constraints.NotEmpty;

public record AddressDTO(
    @NotEmpty String cep,
    @NotEmpty String street,
    @NotEmpty String neighborhood,
    @NotEmpty String locale,
    @NotEmpty String uf,
    @NotEmpty String locationNumber,
    String complement) {
}

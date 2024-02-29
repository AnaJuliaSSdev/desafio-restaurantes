package com.db.backend.dto;

import jakarta.validation.constraints.NotEmpty;

public record AdressDTO(
        @NotEmpty
        String cep,
        @NotEmpty
        String street,
        @NotEmpty
        String neighborhood,
        @NotEmpty
        String locale,
        @NotEmpty
        String uf) {

}

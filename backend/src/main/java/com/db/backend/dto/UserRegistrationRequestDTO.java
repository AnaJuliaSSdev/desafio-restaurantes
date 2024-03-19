package com.db.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UserRegistrationRequestDTO(
        @NotEmpty
        String firstName,
        @NotEmpty
        String lastName,
        @NotEmpty
        @Email
        String email,
        @NotEmpty
        String password
) {
}

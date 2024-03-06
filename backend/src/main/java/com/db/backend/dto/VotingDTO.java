package com.db.backend.dto;

import com.db.backend.entity.Restaurant;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.Collection;

public record VotingDTO(@NotEmpty Collection<Restaurant> restaurants, LocalDateTime startDate, Restaurant winner,
    Boolean isOpen) {
}

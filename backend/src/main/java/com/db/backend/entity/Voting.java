package com.db.backend.entity;

import java.time.LocalDateTime;
import java.util.Collection;

import lombok.NoArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;

@Table(name = "votings")
@Entity(name = "votings")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor()
public class Voting {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<Restaurant> restaurants;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(nullable = true)
    private LocalDateTime startDate = LocalDateTime.now();

    @Column(nullable = false)
    private boolean isOpen;

    @OneToOne
    @JoinColumn(name = "winner_id")
    private Restaurant winner;

    public Voting(Collection<Restaurant> restaurants) {
        this.restaurants = restaurants;
        this.isOpen = true;
    }

    public Collection<Restaurant> getRestaurants() {
        return restaurants;
    }

    public void addRestaurant(Restaurant restaurant) {
        this.restaurants.add(restaurant);
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean isOpen) {
        this.isOpen = isOpen;
    }

    public Restaurant getWinner() {
        return winner;
    }

    public void setWinner(Restaurant winner) {
        this.winner = winner;
    }

}

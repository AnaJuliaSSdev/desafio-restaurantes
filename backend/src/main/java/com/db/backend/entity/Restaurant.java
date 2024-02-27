package com.db.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table(name = "restaurants")
@Entity(name = "restaurants")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = true)
    private String website;

    @Column(nullable = true)
    private int votes = 0;

    @Column(nullable = false)
    private boolean freeToVote = true;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(nullable = true)
    private LocalDateTime avaliableIn;

    @ManyToOne
    @JoinColumn(name = "adress_id")
    private Adress adress;


    public Restaurant(String name, String description, String website, Adress adress) {
        this.name = name;
        this.description = description;
        this.website = website;
        this.adress = adress;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public void setFreeToVote(boolean freeToVote) {
        this.freeToVote = freeToVote;
    }

    public void setAvaliableIn(LocalDateTime avaliableIn) {
        this.avaliableIn = avaliableIn;
    }

    public void setAdress(Adress adress) {
        this.adress = adress;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getWebsite() {
        return website;
    }

    public int getVotes() {
        return votes;
    }

    public boolean isFreeToVote() {
        return freeToVote;
    }

    public LocalDateTime getAvaliableIn() {
        return avaliableIn;
    }

    public Adress getAdress() {
        return adress;
    }
}

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
    @JoinColumn(name = "address_id")
    private Address address;

    public Restaurant(String name, String description, String website, Address address) {
        this.name = name;
        this.description = description;
        this.website = website;
        this.address = address;
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

    public void increaseVotes() {
        this.votes = this.votes + 1;
    }

    public void decreaseVotes() {
        --this.votes;
    }

    public void resetVotes() {
        this.votes = 0;
    }

    public void setFreeToVote(boolean freeToVote) {
        this.freeToVote = freeToVote;
    }

    public void setAvaliableIn(LocalDateTime avaliableIn) {
        this.avaliableIn = avaliableIn;
    }

    public void setAddress(Address address) {
        this.address = address;
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

    public Long getId() {
        return id;
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

    public Address getAddress() {
        return address;
    }

    @Override
    public String toString() {
        return "{´id´: ´%s´, ´name´: ´%s´, ´description´: ´%s´, ´website´: ´%s´, ´votes´: %d, ´freeToVote´: %b, ´avaliableIn´: ´%s´, ´address´: %s}"
                .formatted(id, name, description, website, votes, freeToVote, avaliableIn, address);
    }
}

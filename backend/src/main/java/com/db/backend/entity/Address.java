package com.db.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table(name = "addresses")
@Entity(name = "addresses")
@EqualsAndHashCode(of = "id")
@NoArgsConstructor()
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String neighborhood;

    @Column(nullable = false)
    private String locale;

    @Column(nullable = false)
    private String uf;

    @Column(nullable = false)
    private String locationNumber;

    @Column(nullable = true)
    private String complement;

    public Address(String cep, String street, String neighborhood, String locale, String uf, String locationNumber,
            String complement) {
        this.cep = cep;
        this.street = street;
        this.neighborhood = neighborhood;
        this.locale = locale;
        this.uf = uf;
        this.locationNumber = locationNumber;
        this.complement = complement;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public Long getId() {
        return id;
    }

    public String getLocationNumber() {
        return locationNumber;
    }

    public void setLocationNumber(String locationNumber) {
        this.locationNumber = locationNumber;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getComplement() {
        return complement;
    }

    @Override
    public String toString() {
        return "Address [id=" + id + ", cep=" + cep + ", street=" + street + ", neighborhood=" + neighborhood
                + ", locale=" + locale + ", uf=" + uf + ", locationNumber=" + locationNumber + ", complement="
                + complement + "]";
    }

}

package com.db.backend.controller;

import com.db.backend.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.db.backend.dto.UserAuthenticationRequestDTO;
import com.db.backend.dto.UserRegistrationRequestDTO;
import com.db.backend.dto.UserRegistrationResponseDTO;
import com.db.backend.entity.User;
import com.db.backend.infra.security.JwtService;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

import java.util.Collection;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<UserRegistrationResponseDTO> login(@RequestBody @Valid UserAuthenticationRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = this.jwtService.generate((User) auth.getPrincipal());
        return ResponseEntity.ok(new UserRegistrationResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserRegistrationRequestDTO data) {
        try {
            authorizationService.registerUser(data);
            return new ResponseEntity<>("User Created", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<Collection<User>> getAllUsers() {
        try {
            Collection<User> users = authorizationService.getAllUser();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

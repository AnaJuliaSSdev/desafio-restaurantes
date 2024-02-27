package com.db.backend.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.backend.dto.UserAuthenticationRequestDTO;
import com.db.backend.dto.UserRegistrationRequestDTO;
import com.db.backend.dto.UserRegistrationResponseDTO;
import com.db.backend.entity.User;
import com.db.backend.infra.security.JwtService;
import com.db.backend.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<UserRegistrationResponseDTO> login(@RequestBody @Valid UserAuthenticationRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = this.jwtService.generate((User) auth.getPrincipal());
        return ResponseEntity.ok(new UserRegistrationResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserRegistrationRequestDTO data) {
        String firstName = data.firstName();
        String lastName = data.lastName(); 
        String email = data.email();
        Pattern pattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        Matcher matcher = pattern.matcher(email);
        int passwordLength = data.password().length();

        if(!matcher.matches()){
            return ResponseEntity.badRequest().build();
        }
        if (this.repository.findByEmail(data.email()) != null) {
            return ResponseEntity.badRequest().build();
        }
    
        if (passwordLength < 8 || passwordLength > 12){
            return ResponseEntity.badRequest().build(); 
        }

        if(firstName.isEmpty() || lastName.isEmpty()){
            return ResponseEntity.badRequest().build(); 
        }
    
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User((data.firstName()+ " " + data.lastName()).trim(), data.email(), encryptedPassword);
        this.repository.save(newUser);
        return ResponseEntity.ok().build();
    }
}

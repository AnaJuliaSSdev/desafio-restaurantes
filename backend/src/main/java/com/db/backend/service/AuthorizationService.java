package com.db.backend.service;

import com.db.backend.converter.UserRegistrationConverter;
import com.db.backend.dto.UserRegistrationRequestDTO;
import com.db.backend.entity.User;
import com.db.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AuthorizationService implements UserDetailsService {
    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return this.repository.findByEmail(email);
    }

    public ResponseEntity<String> registerUser(UserRegistrationRequestDTO requestDTO) {
        User userData = new UserRegistrationConverter().convertDtoToEntity(requestDTO);

        if (this.repository.findByEmail(userData.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (requestDTO.password().length() < 8 || requestDTO.password().length() > 12) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.repository.save(userData);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public ResponseEntity<Collection<User>> getAllUser() {
        Collection<User> users = this.repository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}

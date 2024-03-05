package com.db.backend.service;

import com.db.backend.converter.UserRegistrationConverter;
import com.db.backend.dto.UserRegistrationRequestDTO;
import com.db.backend.entity.User;
import com.db.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void registerUser(UserRegistrationRequestDTO requestDTO) throws Exception {
        try {
            User userData = new UserRegistrationConverter().convertDtoToEntity(requestDTO);
            validateUserData(userData, requestDTO);
            this.repository.save(userData);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void validateUserData(User userData, UserRegistrationRequestDTO requestDTO) throws Exception {
        if (this.repository.findByEmail(userData.getEmail()) != null) {
            throw new Exception("E-mail already in use.");
        }
        if (requestDTO.password().length() < 8 || requestDTO.password().length() > 12) {
            throw new Exception("Password Invalid.");
        }
    }

    public Collection<User> getAllUser() throws Exception {
        try {
            return this.repository.findAll();
        } catch (Exception e) {
            throw new Exception("Unable to get all users");
        }
    }
}

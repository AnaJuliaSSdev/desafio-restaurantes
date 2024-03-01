package com.db.backend.converter;

import com.db.backend.dto.UserRegistrationRequestDTO;
import com.db.backend.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationConverter {
    public User convertDtoToEntity(UserRegistrationRequestDTO dto) {
        String fullName = String.format("%s %s", dto.firstName(), dto.lastName()).trim();
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.password());
        return new User(fullName, dto.email(), encryptedPassword);
    }
}

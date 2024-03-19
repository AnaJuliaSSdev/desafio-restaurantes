package com.db.backend.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.db.backend.dto.VotingDTO;
import com.db.backend.entity.User;
import com.db.backend.service.VotingService;

@RestController
@RequestMapping("voting")
public class VotingController {

    @Autowired
    private VotingService votingService;

    @PostMapping("/startVoting")
    public ResponseEntity<String> startNewVoting() {
        try {
            this.votingService.createVoting();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAllVoting")
    public ResponseEntity<Collection<VotingDTO>> getAllVoting() {
        Collection<VotingDTO> votings = this.votingService.getAllVoting();
        return new ResponseEntity<>(votings, HttpStatus.OK);
    }

    @PutMapping("/userVote/{idRestaurant}")
    public ResponseEntity<String> userVote(@PathVariable long idRestaurant) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        Long idUser = user.getId();
        try {
            this.votingService.userVote(idUser, idRestaurant);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("getOpenVoting")
    public ResponseEntity<VotingDTO> getOpenVoting() throws Exception {
        VotingDTO openVoting = votingService.getByIsOpen(true);
        return new ResponseEntity<>(openVoting, HttpStatus.OK);
    }

    @GetMapping("votingHappened")
    public boolean getVotingHappened() {
        return votingService.verifyVotingsDay();
    }
}

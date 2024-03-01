package com.db.backend.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

import com.db.backend.entity.Voting;
import com.db.backend.service.VotingService;

@RestController
@RequestMapping("voting")
public class VotingController {

    @Autowired
    private VotingService votingService;

    @PostMapping("/startVoting")
    public ResponseEntity<String> startNewVoting() {
        this.votingService.createVoting();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getAllVoting")
    public ResponseEntity<Collection<Voting>> getAllVoting() {
        Collection<Voting> votings = this.votingService.getAllVoting();
        return new ResponseEntity<>(votings, HttpStatus.OK);
    }
}

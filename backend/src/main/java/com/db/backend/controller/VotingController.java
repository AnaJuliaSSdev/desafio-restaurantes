package com.db.backend.controller;

import java.util.Collection;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.db.backend.entity.Voting;
import com.db.backend.service.VotingService;

@RequestMapping("voting")
public class VotingController {
    private VotingService votingService;

    @GetMapping("/getAllVoting")
    public ResponseEntity<Collection<Voting>> getAllVoting() {
        Collection<Voting> votings = this.votingService.getAllVoting();
        return new ResponseEntity<>(votings, HttpStatus.OK);
    }

    
}

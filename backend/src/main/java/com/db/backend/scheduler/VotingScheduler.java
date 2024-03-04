package com.db.backend.scheduler;

import com.db.backend.service.VotingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class VotingScheduler {
    @Autowired
    private VotingService votingService;

    @Scheduled(cron = "0 07 18 * * *")
    public ResponseEntity<String> closeOpenVoting() {
        try {
            votingService.closeOpenVoting();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Scheduled(cron = "0 07 18 * * *")
    public ResponseEntity<String> verifyWinner() {
        try {
            votingService.verifyWinner();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

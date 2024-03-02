package com.db.backend.scheduler;

import com.db.backend.service.VotingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class VotingScheduler {
    @Autowired
    private VotingService votingService;

    @Scheduled(cron = "0 0 11 * * *")
    public void closeOpenVoting() {
        votingService.closeOpenVoting();
    }
}

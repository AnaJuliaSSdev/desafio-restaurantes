package com.db.backend.scheduler;

import com.db.backend.entity.Restaurant;
import com.db.backend.entity.Voting;
import com.db.backend.repository.VotingRepository;
import com.db.backend.service.VotingService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class VotingScheduler {
    @Autowired
    private VotingService votingService;

    @Autowired
    private VotingRepository votingRepository;

    @Transactional
    @Scheduled(cron = "0 03 12 * * *")
    public void endCurrentVoting() throws Exception {
        Voting voting = votingRepository.findByIsOpen(true);
        try {
            Restaurant currentWinner = votingService.verifyWinner(voting);
            votingService.calculateAvaliableIn(currentWinner);
            votingService.resetVotes(voting);
            votingService.closeVoting(voting);

            votingService.verifyAvaliableIn();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        } finally {
            votingService.closeOpenVoting(voting);
        }
    }
}

package com.db.backend.repository;

import com.db.backend.entity.Voting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VotingRepository extends JpaRepository<Voting, Long> {

}

package com.db.backend.repository;

import com.db.backend.entity.Voting;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VotingRepository extends JpaRepository<Voting, Long> {
  Voting findByIsOpen(boolean isOpen);

  Optional<Voting> findFirstByStartDateBetweenOrderByStartDateDesc(LocalDateTime startDate, LocalDateTime endofTheDay);
}

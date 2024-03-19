package com.db.backend.converter;

import org.springframework.stereotype.Component;

import com.db.backend.dto.VotingDTO;
import com.db.backend.entity.Voting;

@Component
public class VotingConverter {
  public VotingDTO convertEntityToDto(Voting voting) {
    return new VotingDTO(voting.getRestaurants(), voting.getStartDate(), voting.getWinner(), voting.isOpen());
  }
}

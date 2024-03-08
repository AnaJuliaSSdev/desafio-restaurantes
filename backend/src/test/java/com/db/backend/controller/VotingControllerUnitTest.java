package com.db.backend.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Collection;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.web.WebAppConfiguration;

import org.springframework.test.web.servlet.MockMvc;

import com.db.backend.dto.VotingDTO;
import com.db.backend.service.VotingService;

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
class VotingControllerUnitTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private VotingService votingService;

  @Test
  @WithMockUser(username = "user", roles = { "USER" })
  void startNewVotingSuccess() throws Exception {

    mockMvc.perform(post("/voting/startVoting"))
        .andExpect(status().isOk());

    verify(votingService, times(1)).createVoting();
  }

  @Test
  @WithMockUser(username = "user", roles = { "USER" })
  void getAllVotingSuccess() throws Exception {
    Collection<VotingDTO> votings = Arrays.asList(
        mock(VotingDTO.class),
        mock(VotingDTO.class));

    when(votingService.getAllVoting()).thenReturn(votings);
    mockMvc.perform(get("/voting/getAllVoting"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(2)));
  }

}

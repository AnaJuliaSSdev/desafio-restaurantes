import { VotingI } from "../interfaces/VotingI";
import { http } from "./http";

export async function userVote(id_restaurant: number): Promise<any> {
  return await http.put(`voting/userVote/${id_restaurant}`);
}

export async function startVoting(): Promise<any> {
  return await http.post("voting/startVoting");
}

export async function getAllVotings(): Promise<VotingI[]> {
  const response = await http.get("voting/getAllVoting");

  const votings: VotingI[] = response.data || [];

  return votings;
}

export async function getOpenVoting(): Promise<VotingI | null> {
  return await http.get("voting/getOpenVoting");
}

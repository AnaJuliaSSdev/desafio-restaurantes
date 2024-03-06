import { useEffect, useState } from "react";
import { VotingI } from "@/lib/interfaces/VotingI";
import { getAllVotings } from "@/lib/requests/vote";
import CardVoting from "@/components/CardVoting/CardVoting";

export default function Voting() {
  const [votings, setVotings] = useState<VotingI[]>([]);

  useEffect(() => {
    async function fetchVotings() {
      try {
        const votingData = await getAllVotings();
        setVotings(votingData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchVotings();
  }, []);

  return (
    <ul>
      {votings.map((voting, index) => (
        <CardVoting
          key={index}
          restaurants={voting.restaurants}
          startDate={voting.startDate}
          winner={voting.winner}
          isOpen={voting.isOpen}
        />
      ))}
    </ul>
  );
}

import { useEffect, useState } from "react";
import { VotingI } from "@/lib/interfaces/VotingI";
import { getAllVotings, startVoting } from "@/lib/requests/vote";
import CardVoting from "@/components/CardVoting/CardVoting";
import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Voting() {
  const [votings, setVotings] = useState<VotingI[]>([]);
  const { t } = useTranslation();

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

  const handleStartVoting = async () => {
    try {
      await startVoting();
    } catch (error) {
      console.log(error);
    }
  };

  function formatStartDate(date: string): string {
    return date.slice(0, 10).split("-").reverse().join("/");
  }

  function getWinnerData(data: any, fieldName: string): string {
    data = data.replaceAll("´", '"');
    return JSON.parse(data)[fieldName];
  }

  return (
    <div>
      <div className="align-center">
        <Button
          hidden={votings.length != 0}
          onClick={handleStartVoting}
          className="button-submit"
        >
          {t("voting.start-voting")}
        </Button>
      </div>
      <Box margin={35}>
        <p hidden={votings.length != 0} className="align-center">
          {t("voting.no-record-votes")}
        </p>
      </Box>

      <ul className="align-center">
        {votings.map((voting, index) => (
          <CardVoting
            key={index}
            restaurants={voting.restaurants}
            startDate={formatStartDate(voting.startDate)}
            winner={
              voting.winner ? getWinnerData(voting.winner, "name") : undefined
            }
            votes={
              voting.winner ? getWinnerData(voting.winner, "votes") : undefined
            }
            isOpen={voting.isOpen}
          />
        ))}
      </ul>
    </div>
  );
}

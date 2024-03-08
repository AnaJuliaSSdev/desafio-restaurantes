import { VotingI } from "@/lib/interfaces/VotingI";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  Heading,
  CardFooter,
  Grid,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function CardVoting(prop: Readonly<VotingI>) {
  const { t } = useTranslation();
  return (
    <Card
      marginBottom="30px"
      borderRadius="xl"
      w={{ base: "100%", md: "40%", lg: "50%" }}
      className="boxShadow"
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      position="relative"
    >
      <Grid templateColumns={{ base: "1fr", md: "200px 1fr" }} gap={4}>
        <Image
          className="images"
          src="..\public\vote.png"
          alt="Cursor pointer clicking in vote"
        />
        <Stack position="relative">
          <CardBody>
            <Heading size="md">
              {t("card-voting.voting-started-on")} {prop.startDate}
            </Heading>
            {t("card-voting.open-voting")}{" "}
            {prop.isOpen
              ? `${t("card-voting.yes")}`
              : `${t("card-voting.nope")}`}
            <br></br>
            {t("card-voting.result")}{" "}
            {prop.isOpen
              ? `${t("card-voting.partial")}`
              : `${t("card-voting.final")}`}
            <br></br>
            {prop.winner && `${t("card-voting.winner")}: ${prop.winner}`}
            <br></br>
            {prop.votes && `${t("card-voting.votes")} ${prop.votes}`}
            <Text py="2"></Text>
          </CardBody>
          <CardFooter position="absolute" top="0" right="0"></CardFooter>
        </Stack>
      </Grid>
    </Card>
  );
}

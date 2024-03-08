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

export default function CardVoting(prop: Readonly<VotingI>) {
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
            <Heading size="md">Votação iniciada em: {prop.startDate}</Heading>
            Votação em aberto: {prop.isOpen ? "Sim" : "Não"}
            <br></br>
            Resultado: {prop.isOpen ? " Parcial" : " Final"}
            <br></br>
            {prop.winner && `Restaurante vencedor: ${prop.winner}`}
            <br></br>
            {prop.votes && `Votos: ${prop.votes}`}
            <Text py="2"></Text>
          </CardBody>
          <CardFooter position="absolute" top="0" right="0"></CardFooter>
        </Stack>
      </Grid>
    </Card>
  );
}

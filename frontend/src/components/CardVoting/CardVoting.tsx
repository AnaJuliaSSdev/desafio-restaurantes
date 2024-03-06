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
          objectFit="cover"
          w="100%"
          h="auto"
          src="..\public\restaurant_icon_142617.png"
          alt="Caffe Latte"
        />
        <Stack position="relative">
          <CardBody>
            <Heading size="md">Votação iniciada em: {prop.startDate}</Heading>
            Resultado: {prop.isOpen ? " Parcial" : " Final"}
            {prop.isOpen &&
              prop.winner &&
              `Restaurante vencedor: ${prop.winner.name}, ${prop.winner.votes} votos!`}
            <Text py="2"></Text>
          </CardBody>
          <CardFooter position="absolute" top="0" right="0"></CardFooter>
        </Stack>
      </Grid>
    </Card>
  );
}

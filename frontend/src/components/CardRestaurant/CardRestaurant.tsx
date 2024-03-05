import { Restaurant } from "@/lib/requests/listRestaurants";
import { userVote } from "@/lib/requests/vote";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Text,
  Heading,
  CardFooter,
  Button,
  Grid,
} from "@chakra-ui/react";

export default function CardRestaurant(prop: Readonly<Restaurant>) {
  const handleVote = async (id_restaurant: number) => {
    try {
      await userVote(id_restaurant);
    } catch (error) {
      console.log(error);
    }
  };

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
            <Heading size="md">{prop.name}</Heading>
            <Text py="2">
              Descrição: {prop.description} <br />
              Endereço: {prop.adress.uf}, {prop.adress.locale},
              {prop.adress.neighborhood}, {prop.adress.street},
              {prop.adress.locationNumber} <br></br>
              Votos: {prop.votes} <br></br>
              {prop.website ? (
                <a href={prop.website} target="_blank">
                  <ExternalLinkIcon />
                </a>
              ) : null}
            </Text>
          </CardBody>
          <CardFooter position="absolute" top="0" right="0">
            <Button
              onClick={() => {
                handleVote(prop.id);
              }}
              className="button-submit"
            >
              Vote
            </Button>
          </CardFooter>
        </Stack>
      </Grid>
    </Card>
  );
}

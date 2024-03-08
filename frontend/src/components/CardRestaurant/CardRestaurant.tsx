import { Restaurant } from "@/lib/interfaces/RestauranteI";
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
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CardRestaurant(prop: Readonly<Restaurant>) {
  const { t } = useTranslation();
  const handleVote = async (id_restaurant: number) => {
    try {
      await userVote(id_restaurant);
      setVotes(prop.votes);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [votes, setVotes] = useState(prop.votes);

  return (
    <Card
      marginBottom="30px"
      borderRadius="xl"
      w={{ base: "100%", md: "40%" }}
      className="boxShadow"
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      position="relative"
    >
      <Grid templateColumns={{ base: "1fr", md: "200px 1fr" }} gap={4}>
        <Image
          className="images"
          src="..\public\restaurant_icon_142617.png"
          alt="Caffe Latte"
        />
        <Stack position="relative">
          <CardBody>
            <Heading size="md">{prop.name}</Heading>
            <Text py="2">
              {t("card-restaurant.description")} {prop.description} <br />
              {t("card-restaurant.address")} {prop.address.uf},{" "}
              {prop.address.locale}, {prop.address.neighborhood},{" "}
              {prop.address.street},{prop.address.locationNumber} <br />
              {prop.address.complement ? (
                `${t("card-restaurant.complement")}` +
                `${prop.address.complement}`
              ) : (
                <></>
              )}{" "}
              <br />
              {t("card-restaurant.votes")} {votes} <br />
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
              {votes > 0
                ? `${t("card-restaurant.remove-vote")}`
                : `${t("card-restaurant.vote")}`}
            </Button>
          </CardFooter>
        </Stack>
      </Grid>
    </Card>
  );
}

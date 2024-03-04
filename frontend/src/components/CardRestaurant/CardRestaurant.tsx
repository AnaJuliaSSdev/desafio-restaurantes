import { Restaurant } from "@/lib/requests/listRestaurants";
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
            <Heading size="md">
              {prop.name}
              {prop.website && (
                <a href={prop.website}>
                  <ExternalLinkIcon />
                </a>
              )}
              {prop.website}
            </Heading>
            <Text py="2">
              Descrição: {prop.description} <br />
              Endereço: {prop.adress.uf}, {prop.adress.locale},
              {prop.adress.neighborhood}, {prop.adress.street},
              {prop.adress.locationNumber}
            </Text>
          </CardBody>
          <CardFooter position="absolute" top="0" right="0">
            <Button className="button-submit">Vote</Button>
          </CardFooter>
        </Stack>
      </Grid>
    </Card>
  );
}

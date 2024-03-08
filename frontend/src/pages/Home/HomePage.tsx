import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import { Restaurant } from "@/lib/interfaces/RestauranteI";
import { listRestaurantByFreeToVote } from "@/lib/requests/listRestaurants";
import { getVotingHappened, startVoting } from "@/lib/requests/vote";
import { Box, Button, Heading } from "@chakra-ui/react";
import { t } from "i18next";
import { useEffect, useState } from "react";

export function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [votingHappened, setVotingHappened] = useState<boolean>(false);

  useEffect(() => {
    listRestaurantByFreeToVote(true)
      .then((restaurantData) => {
        setRestaurants(restaurantData);
      })
      .catch((error) => {
        console.log(error);
      });

    getVotingHappened().then(({ data }) => {
      setVotingHappened(data);
    });
  }, []);

  const handleStartVoting = async () => {
    try {
      await startVoting();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4">
      <div className="align-center">
        <Button
          hidden={votingHappened}
          onClick={handleStartVoting}
          className="button-submit"
        >
          {t("home.start-voting")}
        </Button>
      </div>
      <Box margin={35}>
        {!votingHappened && restaurants.length > 0 && (
          <Heading className="align-center">
            {t("home.registered-restaurants")}
          </Heading>
        )}
      </Box>
      <Box margin={35}>
        {votingHappened && (
          <Heading className="align-center">{t("home.ranking-voting")}</Heading>
        )}
      </Box>
      <div>
        {restaurants.length === 0 && (
          <p className="align-center">{t("home.no-registered-restaurants")}</p>
        )}
        <ul className="flex-column">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardRestaurant
                key={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                website={restaurant.website}
                address={restaurant.address}
                votes={restaurant.votes}
                id={restaurant.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

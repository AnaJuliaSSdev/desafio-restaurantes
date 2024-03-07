import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import { Restaurant } from "@/lib/interfaces/RestauranteI";
import { listRestaurantByFreeToVote } from "@/lib/requests/listRestaurants";
import { getVotingHappened, startVoting } from "@/lib/requests/vote";
import { UnlockIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import { t } from "i18next";
import { useEffect, useState } from "react";

export function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [votingHappened, setVotingHappened] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const restaurantData = await listRestaurantByFreeToVote(true);
        setRestaurants(restaurantData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRestaurants();
  }, []);

  const handleStartVoting = async () => {
    try {
      await startVoting();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchIsOpenVoting() {
      const response = await getVotingHappened();
      setVotingHappened(response.data);
    }
    fetchIsOpenVoting();
  }, []);

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
          <Heading className="align-center">Restaurantes cadastrados:</Heading>
        )}
      </Box>
      <Box margin={35}>
        {votingHappened && (
          <Heading className="align-center">
            Ranking da votação de hoje:
          </Heading>
        )}
      </Box>
      <div>
        {restaurants.length === 0 && (
          <p className="align-center">
            Não existem restaurantes cadastrados. Cadastre um restaurante agora
            e comece a votar!
          </p>
        )}
        <ul>
            {restaurants.map((restaurant) => (
              <li style={{display: 'flex', justifyContent: 'center'}}>
                <CardRestaurant
                  key={restaurant.id}
                  name={restaurant.name}
                  description={restaurant.description}
                  website={restaurant.website}
                  adress={restaurant.adress}
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

import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import { Restaurant } from "@/lib/interfaces/RestauranteI";
import { listRestaurantByFreeToVote } from "@/lib/requests/listRestaurants";
import { startVoting } from "@/lib/requests/vote";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

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
      console.log("votação iniciada");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4">
      <Button onClick={handleStartVoting} className="button-submit">
        Start Voting
      </Button>
      <div>
        <ul>
          {restaurants.map((restaurant) => (
            <CardRestaurant
              key={restaurant.id}
              name={restaurant.name}
              description={restaurant.description}
              website={restaurant.website}
              adress={restaurant.adress}
              votes={restaurant.votes}
              id={restaurant.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

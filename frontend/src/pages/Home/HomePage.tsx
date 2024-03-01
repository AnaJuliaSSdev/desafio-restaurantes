import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import { Restaurant, listRestaurantByFreeToVote } from "@/lib/requests/listRestaurants";
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

  return (
    <div className="px-4">
      <div>
        <ul>
          {restaurants.map((restaurant, index) => (
            <CardRestaurant
              key={index}
              name={restaurant.name}
              description={restaurant.description}
              website={restaurant.website}
              adress={restaurant.adress}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

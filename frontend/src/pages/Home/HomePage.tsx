import CardRestaurant from "@/components/CardRestaurant/CardRestaurant";
import { Restaurant, listRestaurant } from "@/lib/requests/listRestaurants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const restaurantData = await listRestaurant();
        setRestaurants(restaurantData);
      } catch (error) {
        console.error("Erro ao buscar restaurantes:", error);
      }
    }

    fetchRestaurants();
  }, []);

  return (
    <div className="px-4">
      <div>
        <ul>
          {restaurants.map((restaurant) => (
            <CardRestaurant
              key={restaurant.name}
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

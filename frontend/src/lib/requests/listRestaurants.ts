import { Restaurant } from "../interfaces/RestauranteI";
import { http } from "./http";

export async function listRestaurantByFreeToVote(
  isFreeToVote: boolean
): Promise<Restaurant[]> {
  const response = await http.get(`restaurant/getByFreeToVote/${isFreeToVote}`);

  const restaurants: Restaurant[] = response.data || [];

  return restaurants;
}

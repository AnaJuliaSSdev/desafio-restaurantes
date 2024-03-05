import { http } from "./http";
import { Adress } from "./registerRestaurant";

export interface Restaurant {
  name: string;
  description: string;
  website: string | null;
  adress: Adress;
  votes: number;
}

export async function listRestaurantByFreeToVote(
  isFreeToVote: boolean
): Promise<Restaurant[]> {
  const response = await http.get(`restaurant/getByFreeToVote/${isFreeToVote}`);

  const restaurants: Restaurant[] = response.data || [];

  return restaurants;
}

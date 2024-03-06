import { Adress } from "../interfaces/AdressI";
import { http } from "./http";

export async function createRestaurant(
  name: string,
  description: string,
  website: string,
  adress: Adress
): Promise<any> {
  return http.post("restaurant/create", { name, description, website, adress });
}

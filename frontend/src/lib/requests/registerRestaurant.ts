import { Address } from "../interfaces/AddressI";
import { http } from "./http";

export async function createRestaurant(
  name: string,
  description: string,
  website: string,
  address: Address
): Promise<any> {
  return http.post("restaurant/create", {
    name,
    description,
    website,
    address,
  });
}

import { http } from "./http";

export interface Adress {
  cep: string;
  street: string;
  neighborhood: string;
  locale: string;
  uf: string;
  locationNumber: string;
}

export async function createRestaurant(
  name: string,
  description: string,
  website: string,
  adress: Adress
): Promise<any> {
  return http.post("restaurant/create", { name, description, website, adress });
}

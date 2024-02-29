import { http } from "./http";

export interface Adress {
    cep: string;
    street: string;
    neighborhood: string;
    locale: string;
    uf: string;
}

export async function createRestaurant(name: string, description: string, website: string, adress: Adress): Promise<number> {
  http.post(
    "restaurant/create", { name, description, website, adress},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return 200;
}

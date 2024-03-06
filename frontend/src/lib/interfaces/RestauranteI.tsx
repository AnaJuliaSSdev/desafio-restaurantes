import { Adress } from "./AdressI";

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  website: string | null;
  adress: Adress;
  votes: number;
}

import { Address } from "./AddressI";

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  website: string | null;
  address: Address;
  votes: number;
}

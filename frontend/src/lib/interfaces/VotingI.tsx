import { Restaurant } from "./RestauranteI";

export interface VotingI {
  restaurants: Restaurant[];
  startDate: string;
  winner?: string;
  isOpen: boolean;
  votes?: string;
}

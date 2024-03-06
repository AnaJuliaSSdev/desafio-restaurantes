import { Restaurant } from "./RestauranteI";

export interface VotingI {
  restaurants: Restaurant[];
  startDate: string;
  winner?: Restaurant;
  isOpen: boolean;
}

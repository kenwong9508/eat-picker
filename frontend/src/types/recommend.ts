import { Cuisine, Restaurant, Speed } from "../types/restaurant";

export interface RecommendRequest {
  budget: number;
  speed: Speed;
  cuisine: Cuisine;
}

export type RecommendResponse = Restaurant;

import type { Speed, Cuisine } from "../constants/restaurant";

export interface Restaurant {
  id: number;
  name: string;
  avgPrice: number;
  speed: Speed;
  cuisine: Cuisine;
  takeaway: boolean;
  dineIn: boolean;
  active: boolean;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// export interface CreateRestaurantInput {
//   name: string;
//   avgPrice: number;
//   speed: Speed;
//   cuisine: Cuisine;
//   takeaway: boolean;
//   dineIn: boolean;
//   active: boolean;
//   address: string;
// }

// export type UpdateRestaurantInput = Partial<CreateRestaurantInput>;

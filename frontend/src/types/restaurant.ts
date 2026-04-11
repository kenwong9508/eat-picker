import type { CUISINES, SPEEDS } from "../constants/restaurant";

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

// export interface RestaurantsRequest {
//   page: number;
//   limit: number;
//   // 之後加 filter 可以擴充呢度
//   // name?: string;
//   // cuisine?: Cuisine;
//   // active?: boolean;
// }

// export interface RestaurantsResponse {
//   restaurants: Restaurant[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     pages: number;
//     hasNext: boolean;
//   };
// }

export type Cuisine = (typeof CUISINES)[number];
export type Speed = (typeof SPEEDS)[number];

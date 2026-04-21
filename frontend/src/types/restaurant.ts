import type { SPEEDS, CUISINES } from "../constants/restaurant";

export type Speed = (typeof SPEEDS)[number];
export type Cuisine = (typeof CUISINES)[number];

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

export type RestaurantFormState = {
  name: string;
  avgPrice: string;
  speed: Speed;
  cuisine: Cuisine;
  address: string;
  takeaway: boolean;
  dineIn: boolean;
  active: boolean;
};

export interface RestaurantsGetRequest {
  page: number;
  limit: number;
  // 之後加 filter 可以擴充呢度
  // name?: string;
  // cuisine?: Cuisine;
  // active?: boolean;
}

export interface RestaurantsGetResponse {
  restaurants: Restaurant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
  };
}

export interface RestaurantCreateRequest {
  name: string;
  avgPrice: number;
  speed: Speed;
  cuisine: Cuisine;
  takeaway: boolean;
  dineIn: boolean;
  active: boolean;
  address?: string;
}

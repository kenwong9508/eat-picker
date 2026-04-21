// frontend/src/api/restaurants.ts
import type {
  Restaurant,
  RestaurantsGetRequest,
  RestaurantsGetResponse,
  RestaurantCreateRequest,
  RestaurantUpdateRequest,
} from "../types/restaurant";
import { apiGet, apiPost, apiPatch } from "./client";
import { ApiResponse } from "../types/api";
import { isEmptyArray } from "../utils";

export async function fetchRestaurants(
  params: RestaurantsGetRequest,
): Promise<RestaurantsGetResponse> {
  const res = await apiGet<ApiResponse<RestaurantsGetResponse>>(
    "api/restaurants",
    { params },
  );

  if ("error" in res) {
    throw new Error(res?.error?.message ?? "Unknown error");
  }

  if (isEmptyArray(res.data.restaurants)) {
    throw new Error("No restaurants found");
  }

  return res.data;
}

export async function createRestaurant(
  payload: RestaurantCreateRequest,
): Promise<Restaurant> {
  const res = await apiPost<ApiResponse<Restaurant>>(
    "api/restaurants",
    payload,
  );

  if ("error" in res) {
    throw new Error(res?.error?.message ?? "Unknown error");
  }

  return res.data;
}

export async function editRestaurant(
  id: number,
  payload: RestaurantUpdateRequest,
): Promise<Restaurant> {
  const res = await apiPatch<ApiResponse<Restaurant>>(
    `api/restaurants/${id}`,
    payload,
  );

  if ("error" in res) {
    throw new Error(res?.error?.message ?? "Unknown error");
  }

  return res.data;
}

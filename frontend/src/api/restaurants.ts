// frontend/src/api/restaurants.ts
import type {
  RestaurantsGetResponse,
  RestaurantsGetRequest,
} from "../types/restaurant";
import { apiGet } from "./client";
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

import { ApiResponse } from "../types/api";
import { RecommendRequest, RecommendResponse } from "../types/recommend";
import { apiGet } from "./client";
import { isEmptyObject } from "../utils";

export async function fetchRecommendRestaurant(
  params: RecommendRequest,
): Promise<RecommendResponse> {
  const res = await apiGet<ApiResponse<RecommendResponse>>(
    "api/restaurants/recommend",
    { params },
  );

  if ("error" in res) {
    throw new Error(res?.error?.message ?? "Unknown error");
  }

  if (isEmptyObject(res.data)) {
    throw new Error("No restaurant matches your preferences");
  }

  return res.data;
}

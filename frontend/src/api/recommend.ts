import { ApiResponse } from "./types";
import { RecommendResponse, RecommendRequest } from "../hooks/useRecommend";
import { apiGet } from "./client";

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

  return res.data;
}

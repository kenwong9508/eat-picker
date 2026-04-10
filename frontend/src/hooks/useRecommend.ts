import { useMutation } from "@tanstack/react-query";
import { fetchRecommendRestaurant } from "../api/recommend";
import { Restaurant } from "../types/restaurant";
import { Cuisine, Speed } from "../constants/restaurant";

export interface RecommendRequest {
  budget: number;
  speed: Speed;
  cuisine: Cuisine;
}

export type RecommendResponse = Restaurant;

export function useRecommend() {
  const { mutate, data, isPending, isError, error } = useMutation<
    RecommendResponse,
    Error,
    RecommendRequest
  >({
    mutationKey: ["recommend"],
    mutationFn: (payload) => fetchRecommendRestaurant(payload),
  });

  return {
    getRecommend: mutate,
    data,
    isLoading: isPending,
    isApiError: isError,
    apiError: error,
  };
}

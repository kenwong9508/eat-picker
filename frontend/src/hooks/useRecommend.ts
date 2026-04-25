import { useMutation } from "@tanstack/react-query";
import { fetchRecommendRestaurant } from "../api/recommend";
import { RecommendRequest, RecommendResponse } from "../types/recommend";

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

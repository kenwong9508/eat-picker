// frontend/src/hooks/useRecommend.ts
import { useMutation } from "@tanstack/react-query";
import { fetchRecommendRestaurant } from "../api/recommend";
import { RecommendRequest, RecommendResponse } from "../types/recommend";
import { useRecommendFormStore } from "../stores/useRecommendFormStore";

export function useRecommend() {
  const setRecommendResult = useRecommendFormStore(
    (state) => state.setRecommendResult,
  );

  const { mutate, isPending, isError, error } = useMutation<
    RecommendResponse,
    Error,
    RecommendRequest
  >({
    mutationKey: ["recommend"],
    mutationFn: (payload) => fetchRecommendRestaurant(payload),
    onSuccess: (data) => {
      setRecommendResult(data);
    },
  });

  return {
    getRecommend: mutate,
    isLoading: isPending,
    isApiError: isError,
    apiError: error,
  };
}

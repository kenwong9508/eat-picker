// frontend/src/hooks/useRecommend.ts
import { useMutation } from "@tanstack/react-query";
import { fetchRecommendRestaurant } from "../api/recommend";
import { RecommendRequest, RecommendResponse } from "../types/recommend";
import { useRecommendFormStore } from "../stores/useRecommendFormStore";

export function useRecommend() {
  const setRecommendResult = useRecommendFormStore(
    (state) => state.setRecommendResult,
  );
  const setRecommendErrorMessage = useRecommendFormStore(
    (state) => state.setRecommendErrorMessage,
  );

  const { mutate, isPending } = useMutation<
    RecommendResponse,
    Error,
    RecommendRequest
  >({
    mutationKey: ["recommend"],
    mutationFn: (payload) => fetchRecommendRestaurant(payload),
    onSuccess: (data) => {
      setRecommendResult(data);
      setRecommendErrorMessage(null);
    },
    onError: (error) => {
      setRecommendResult(null);
      setRecommendErrorMessage(error.message);
    },
  });

  return {
    getRecommend: mutate,
    isLoading: isPending,
  };
}

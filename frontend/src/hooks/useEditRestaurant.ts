// frontend/src/hooks/useEditRestaurant.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RestaurantUpdateRequest } from "../types/restaurant";
import { editRestaurant } from "../api/restaurants";

export function useEditRestaurant(id: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RestaurantUpdateRequest) => {
      if (id == null) throw new Error("Missing restaurant id");
      return editRestaurant(id, payload);
    },
    onSuccess: () => {
      // 重新拉餐廳 list
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
}

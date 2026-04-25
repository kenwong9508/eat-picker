// frontend/src/hooks/useCreateRestaurant.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRestaurant } from "../api/restaurants";
import type { RestaurantCreateRequest, Restaurant } from "../types/restaurant";

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  const mutation = useMutation<Restaurant, Error, RestaurantCreateRequest>({
    mutationFn: (payload) => createRestaurant(payload),
    onSuccess: () => {
      // 成功後，重取 restaurant list
      queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
    },
  });

  return mutation;
}

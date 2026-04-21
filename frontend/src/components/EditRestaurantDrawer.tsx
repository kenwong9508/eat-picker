// frontend/src/components/EditRestaurantDrawer.tsx
import { RestaurantDrawerBase } from "./RestaurantDrawerBase";
import type {
  RestaurantFormState,
  RestaurantUpdateRequest,
} from "../types/restaurant";
import type { Restaurant } from "../types/restaurant";
import { useEditRestaurant } from "../hooks/useEditRestaurant";

type Props = {
  open: boolean;
  restaurant: Restaurant | null;
  onClose: () => void;
  onSuccess: () => void;
};

export function EditRestaurantDrawer({
  open,
  restaurant,
  onClose,
  onSuccess,
}: Props) {
  // 如果仲未有 restaurant，就唔 call API，只係 render 個空表單（會被 disabled）
  const id = restaurant?.id ?? null;
  const { mutateAsync, isPending, error } = useEditRestaurant(id);

  // 當 restaurant 未 ready 時，用一組安全嘅 default 值
  const initialValues: RestaurantFormState = restaurant
    ? {
        name: restaurant.name,
        avgPrice: String(restaurant.avgPrice),
        speed: restaurant.speed,
        cuisine: restaurant.cuisine,
        address: restaurant.address ?? "",
        takeaway: restaurant.takeaway,
        dineIn: restaurant.dineIn,
        active: restaurant.active,
      }
    : {
        name: "",
        avgPrice: "",
        speed: "fast",
        cuisine: "congee",
        address: "",
        takeaway: true,
        dineIn: true,
        active: true,
      };

  const handleSubmit = async (payload: RestaurantUpdateRequest) => {
    // 冇 id（即 restaurant 未 load 好）時直接 ignore
    if (!id) return;
    await mutateAsync(payload);
    onSuccess();
    onClose();
  };

  return (
    <RestaurantDrawerBase
      open={open}
      mode="edit"
      initialValues={initialValues}
      submitting={isPending || !restaurant} // 未 load 好時都當係 submitting，避免 user 改
      apiError={error?.message ?? null}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

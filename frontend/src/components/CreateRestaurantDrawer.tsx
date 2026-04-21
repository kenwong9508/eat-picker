// frontend/src/components/CreateRestaurantDrawer.tsx
import { RestaurantDrawerBase } from "./RestaurantDrawerBase";
import type {
  RestaurantCreateRequest,
  RestaurantFormState,
} from "../types/restaurant";
import { useCreateRestaurant } from "../hooks/useCreateRestaurant";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const defaultValues: RestaurantFormState = {
  name: "",
  avgPrice: "",
  speed: "fast",
  cuisine: "congee",
  address: "",
  takeaway: true,
  dineIn: true,
  active: true,
};

export function CreateRestaurantDrawer({ open, onClose, onSuccess }: Props) {
  const { mutateAsync, isPending, error } = useCreateRestaurant();

  const handleSubmit = async (payload: RestaurantCreateRequest) => {
    await mutateAsync(payload);
    onSuccess();
    onClose();
  };

  return (
    <RestaurantDrawerBase
      open={open}
      mode="create"
      initialValues={defaultValues}
      submitting={isPending}
      apiError={error?.message ?? null}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

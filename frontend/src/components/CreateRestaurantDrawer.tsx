// frontend/src/components/CreateRestaurantDrawer.tsx
import { useState } from "react";
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

const EMPTY_FORM: RestaurantFormState = {
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

  const [draft, setDraft] = useState<RestaurantFormState>(EMPTY_FORM);

  const handleSubmit = async (payload: RestaurantCreateRequest) => {
    await mutateAsync(payload);
    onSuccess();
    // A 方案：成功 create 先清草稿
    setDraft(EMPTY_FORM);
    onClose();
  };

  return (
    <RestaurantDrawerBase
      open={open}
      mode="create"
      initialValues={draft}
      submitting={isPending}
      apiError={error?.message ?? null}
      onClose={onClose} // Cancel / ✕ 只關 drawer，不清 draft
      onSubmit={handleSubmit}
      onFormChange={setDraft} // 同步草稿到 parent
    />
  );
}

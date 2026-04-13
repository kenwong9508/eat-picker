// frontend/src/components/CreateRestaurantDrawer.tsx
import { FormEvent, useEffect, useState } from "react";
import type {
  RestaurantCreateRequest,
  Speed,
  Cuisine,
} from "../types/restaurant";
import { cn } from "../utils";
import { CUISINE_OPTIONS, SPEED_OPTIONS } from "../constants/restaurant";
import { useCreateRestaurant } from "../hooks/useCreateRestaurant";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type FormState = {
  name: string;
  avgPrice: string;
  speed: Speed;
  cuisine: Cuisine;
  address: string;
  takeaway: boolean;
  dineIn: boolean;
  active: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const defaultValues: FormState = {
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
  const [form, setForm] = useState<FormState>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isConfirmStage, setIsConfirmStage] = useState(false);

  const {
    mutateAsync: mutateCreate,
    isPending: isSubmitting,
    error: mutationError,
  } = useCreateRestaurant();

  // 打開時只 reset 狀態，不清 form（保留已填資料）
  useEffect(() => {
    if (open) {
      setErrors({});
      setApiError(null);
      setIsConfirmStage(false);
    }
  }, [open]);

  // 從 mutation error 同步到本地 apiError（例如 backend validation message）
  useEffect(() => {
    if (mutationError) {
      setApiError(mutationError.message);
    }
  }, [mutationError]);

  const handleChange =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      // 一有更改就退出 confirm 狀態，防止改完但唔再確認
      setIsConfirmStage(false);
      setApiError(null);
    };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    const price = Number(form.avgPrice);
    if (!form.avgPrice.trim() || Number.isNaN(price)) {
      nextErrors.avgPrice = "Average price must be a number";
    } else if (price <= 0) {
      nextErrors.avgPrice = "Average price must be greater than 0";
    }

    if (!form.speed) {
      nextErrors.speed = "Speed is required";
    }

    if (!form.cuisine) {
      nextErrors.cuisine = "Cuisine is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (): RestaurantCreateRequest => ({
    name: form.name.trim(),
    avgPrice: Number(form.avgPrice),
    speed: form.speed,
    cuisine: form.cuisine,
    takeaway: form.takeaway,
    dineIn: form.dineIn,
    active: form.active,
    address: form.address.trim() || undefined,
  });

  // 第一步：submit form → validate → 進入 confirm stage
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      setIsConfirmStage(false);
      return;
    }

    // 已經 valid，顯示確認層
    setIsConfirmStage(true);
  };

  // 第二步：確認後真正 call API（經 custom hook）
  const handleConfirmCreate = async () => {
    if (isSubmitting) return;

    const payload = buildPayload();

    try {
      await mutateCreate(payload);
      // 成功 create 後先清空 form，下次再開係空白
      setForm(defaultValues);
      onSuccess();
      onClose();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create restaurant";
      setApiError(message);
      // 出錯時保留 confirm bar，俾 user 可以再按一次
      setIsConfirmStage(true);
    }
  };

  // 關閉時阻止 backdrop click 穿透
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-40 transition",
        open
          ? "pointer-events-auto bg-black/40 backdrop-blur-sm"
          : "pointer-events-none bg-transparent",
      )}
      onClick={handleBackdropClick}
    >
      {/* Drawer panel - right side on desktop, full width on mobile */}
      <section
        className={cn(
          "absolute inset-y-0 right-0 flex h-full w-full max-w-full transform bg-stone-50 shadow-xl transition duration-300 dark:bg-stone-900",
          open ? "translate-x-0" : "translate-x-full",
          "sm:max-w-2xl",
        )}
      >
        <form
          className="flex h-full flex-col gap-4 overflow-hidden"
          onSubmit={handleSubmit}
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-stone-200 px-4 py-3 dark:border-stone-800">
            <div>
              <h2 className="text-base font-semibold sm:text-lg">
                Create restaurant
              </h2>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Add a new restaurant used for recommendations.
              </p>
            </div>
            <button
              type="button"
              className="rounded-full p-1 text-stone-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:text-stone-400 dark:hover:bg-stone-800"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <span className="sr-only">Close</span>✕
            </button>
          </header>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
            {/* Desktop: two-column; mobile: single column */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-300">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name")(e.target.value)}
                  className={cn(
                    "mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none transition dark:bg-stone-950",
                    errors.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-500/60"
                      : "border-stone-200 focus:ring-2 focus:ring-amber-500/60 dark:border-stone-700",
                  )}
                  placeholder="Restaurant Name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Avg price */}
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-300">
                  Average price (HK$ / person)
                </label>
                <div className="mt-1 flex items-center gap-1 rounded-xl border bg-white px-2 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-950">
                  <span className="px-1 text-xs text-stone-500">HK$</span>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    value={form.avgPrice}
                    onChange={(e) => handleChange("avgPrice")(e.target.value)}
                    className="h-7 flex-1 bg-transparent text-sm outline-none"
                    placeholder="100"
                  />
                  <span className="px-1 text-[11px] text-stone-500">
                    / person
                  </span>
                </div>
                {errors.avgPrice && (
                  <p className="mt-1 text-xs text-red-500">{errors.avgPrice}</p>
                )}
              </div>

              {/* Speed */}
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-300">
                  Speed
                </label>
                <div className="mt-1 flex gap-1.5">
                  {SPEED_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleChange("speed")(opt.value)}
                      className={cn(
                        "flex-1 rounded-full border px-2 py-1 text-xs font-medium transition",
                        form.speed === opt.value
                          ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                          : "border-stone-300 text-stone-600 hover:border-amber-400 dark:border-stone-700 dark:text-stone-300",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.speed && (
                  <p className="mt-1 text-xs text-red-500">{errors.speed}</p>
                )}
              </div>

              {/* Cuisine */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-300">
                  Cuisine
                </label>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {CUISINE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleChange("cuisine")(opt.value)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition",
                        form.cuisine === opt.value
                          ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                          : "border-stone-300 text-stone-600 hover:border-amber-400 dark:border-stone-700 dark:text-stone-300",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.cuisine && (
                  <p className="mt-1 text-xs text-red-500">{errors.cuisine}</p>
                )}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-300">
                  Address
                </label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => handleChange("address")(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500/60 dark:border-stone-700 dark:bg-stone-950"
                  placeholder="Address"
                />
              </div>

              {/* Options toggles */}
              <div className="space-y-2 sm:col-span-2">
                {/* Takeaway */}
                <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-3 py-2 dark:border-stone-700 dark:bg-stone-950">
                  <div>
                    <p className="text-xs font-medium text-stone-700 dark:text-stone-200">
                      Takeaway
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Supports takeaway orders
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange("takeaway")(!form.takeaway)}
                    className={cn(
                      "flex h-5 w-9 items-center rounded-full px-0.5 text-xs transition",
                      form.takeaway
                        ? "bg-emerald-500"
                        : "bg-stone-300 dark:bg-stone-700",
                    )}
                  >
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full bg-white shadow transition",
                        form.takeaway ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>

                {/* Dine-in */}
                <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-3 py-2 dark:border-stone-700 dark:bg-stone-950">
                  <div>
                    <p className="text-xs font-medium text-stone-700 dark:text-stone-200">
                      Dine-in
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Has dine-in seats
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange("dineIn")(!form.dineIn)}
                    className={cn(
                      "flex h-5 w-9 items-center rounded-full px-0.5 text-xs transition",
                      form.dineIn
                        ? "bg-emerald-500"
                        : "bg-stone-300 dark:bg-stone-700",
                    )}
                  >
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full bg-white shadow transition",
                        form.dineIn ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>

                {/* Active */}
                <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-3 py-2 dark:border-stone-700 dark:bg-stone-950">
                  <div>
                    <p className="text-xs font-medium text-stone-700 dark:text-stone-200">
                      Active
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Include in recommendations
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange("active")(!form.active)}
                    className={cn(
                      "flex h-5 w-9 items-center rounded-full px-0.5 text-xs transition",
                      form.active
                        ? "bg-emerald-500"
                        : "bg-stone-300 dark:bg-stone-700",
                    )}
                  >
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full bg-white shadow transition",
                        form.active ? "translate-x-4" : "translate-x-0",
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* API error */}
            {apiError && (
              <p className="mt-3 text-xs text-red-500">{apiError}</p>
            )}
          </div>

          {/* Footer */}
          <footer className="flex flex-col gap-2 border-t border-stone-200 bg-stone-50 px-4 py-3 text-xs dark:border-stone-800 dark:bg-stone-950 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-2xl px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              {isConfirmStage && (
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  Confirm to create this restaurant.
                </span>
              )}
            </div>

            <div className="flex gap-2 sm:justify-end">
              {isConfirmStage && (
                <button
                  type="button"
                  className="cursor-pointer rounded-2xl border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-800"
                  onClick={() => setIsConfirmStage(false)}
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}

              <button
                type={isConfirmStage ? "button" : "submit"}
                onClick={isConfirmStage ? handleConfirmCreate : undefined}
                className={cn(
                  "cursor-pointer rounded-2xl px-5 py-2 text-sm font-semibold shadow-sm disabled:cursor-not-allowed",
                  isConfirmStage
                    ? "bg-emerald-500 text-stone-950 hover:bg-emerald-400 disabled:bg-emerald-400/60"
                    : "bg-amber-500 text-stone-950 hover:bg-amber-400 active:bg-amber-500/90 disabled:bg-amber-400/60",
                )}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating…"
                  : isConfirmStage
                    ? "Confirm & create"
                    : "Create restaurant"}
              </button>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}

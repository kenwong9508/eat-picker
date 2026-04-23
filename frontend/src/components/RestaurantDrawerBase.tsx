// frontend/src/components/RestaurantDrawerBase.tsx
import { FormEvent, useEffect, useState } from "react";
import type { RestaurantCreateRequest } from "../types/restaurant";
import type { RestaurantFormState } from "../types/restaurant";
import { cn } from "../utils";
import { CUISINE_OPTIONS, SPEED_OPTIONS } from "../constants/restaurant";

type Mode = "create" | "edit";

type Props = {
  open: boolean;
  mode: Mode;
  initialValues: RestaurantFormState;
  submitting: boolean;
  apiError: string | null;
  onClose: () => void;
  onSubmit: (payload: RestaurantCreateRequest) => Promise<void>;
};

type FormErrors = Partial<Record<keyof RestaurantFormState, string>>;

export function RestaurantDrawerBase({
  open,
  mode,
  initialValues,
  submitting,
  apiError,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<RestaurantFormState>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isConfirmStage, setIsConfirmStage] = useState(false);
  const [localApiError, setLocalApiError] = useState<string | null>(null);

  // 打開 / initialValues 變時 sync 狀態
  useEffect(() => {
    if (open) {
      setForm(initialValues);
      setErrors({});
      setIsConfirmStage(false);
      setLocalApiError(null);
    }
  }, [open]);

  // 外面傳入的 apiError → 顯示喺 drawer
  useEffect(() => {
    if (apiError) {
      setLocalApiError(apiError);
    }
  }, [apiError]);

  const handleChange =
    <K extends keyof RestaurantFormState>(key: K) =>
    (value: RestaurantFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      setIsConfirmStage(false);
      setLocalApiError(null);
    };

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!form.name.trim()) next.name = "Name is required";

    const price = Number(form.avgPrice);
    if (!form.avgPrice.trim() || Number.isNaN(price)) {
      next.avgPrice = "Average price must be a number";
    } else if (price <= 0) {
      next.avgPrice = "Average price must be greater than 0";
    }

    if (!form.speed) next.speed = "Speed is required";
    if (!form.cuisine) next.cuisine = "Cuisine is required";

    setErrors(next);
    return Object.keys(next).length === 0;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocalApiError(null);

    if (!validate()) {
      setIsConfirmStage(false);
      return;
    }

    setIsConfirmStage(true);
  };

  const handleConfirm = async () => {
    if (submitting) return;
    const payload = buildPayload();
    try {
      await onSubmit(payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Operation failed";
      setLocalApiError(message);
      setIsConfirmStage(true);
    }
  };

  const title = mode === "create" ? "Create restaurant" : "Edit restaurant";
  const description =
    mode === "create"
      ? "Add a new restaurant used for recommendations."
      : "Update this restaurant’s details.";
  const confirmHint =
    mode === "create"
      ? "Confirm to create this restaurant."
      : "Confirm to update this restaurant.";
  const primaryLabel = submitting
    ? mode === "create"
      ? "Creating…"
      : "Saving…"
    : isConfirmStage
      ? mode === "create"
        ? "Confirm & create"
        : "Confirm & save"
      : mode === "create"
        ? "Create restaurant"
        : "Save changes";

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-40 transition",
        open
          ? "pointer-events-auto bg-black/40 backdrop-blur-sm"
          : "pointer-events-none bg-transparent",
      )}
      // 已經移除 onClick，backdrop 唔會再關 drawer
    >
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
              <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                {description}
              </p>
            </div>
            <button
              type="button"
              className="rounded-full p-1 text-stone-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-400 dark:text-stone-400 dark:hover:bg-stone-800"
              onClick={onClose}
              disabled={submitting}
            >
              <span className="sr-only">Close</span>✕
            </button>
          </header>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
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
                        "cursor-pointer flex-1 rounded-full border px-2 py-1 text-xs font-medium transition",
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
                        "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition",
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

              {/* Toggles */}
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
                      "cursor-pointer flex h-5 w-9 items-center rounded-full px-0.5 text-xs transition",
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
                      "cursor-pointer flex h-5 w-9 items-center rounded-full px-0.5 text-xs transition",
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
                      "cursor-pointer flex h-5 w-9 items-center rounded-full px-0.5 text-xs transition",
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
            {localApiError && (
              <p className="mt-3 text-xs text-red-500">{localApiError}</p>
            )}
          </div>

          {/* Footer */}
          <footer className="flex flex-col gap-2 border-t border-stone-200 bg-stone-50 px-4 py-3 text-xs dark:border-stone-800 dark:bg-stone-950 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-2xl px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                onClick={onClose}
                disabled={submitting}
              >
                Cancel
              </button>
              {isConfirmStage && (
                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                  {confirmHint}
                </span>
              )}
            </div>

            <div className="flex gap-2 sm:justify-end">
              {isConfirmStage && (
                <button
                  type="button"
                  className="cursor-pointer rounded-2xl border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:border-stone-600 dark:text-stone-200 dark:hover:bg-stone-800"
                  onClick={() => setIsConfirmStage(false)}
                  disabled={submitting}
                >
                  Back
                </button>
              )}

              <button
                type={isConfirmStage ? "button" : "submit"}
                onClick={isConfirmStage ? handleConfirm : undefined}
                className={cn(
                  "cursor-pointer rounded-2xl px-5 py-2 text-sm font-semibold shadow-sm disabled:cursor-not-allowed",
                  isConfirmStage
                    ? "bg-emerald-500 text-stone-950 hover:bg-emerald-400 disabled:bg-emerald-400/60"
                    : "bg-amber-500 text-stone-950 hover:bg-amber-400 active:bg-amber-500/90 disabled:bg-amber-400/60",
                )}
                disabled={submitting}
              >
                {primaryLabel}
              </button>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}

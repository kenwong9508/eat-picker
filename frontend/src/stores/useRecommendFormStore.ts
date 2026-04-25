// frontend/src/stores/useRecommendFormStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cuisine, Speed } from "../types/restaurant";

interface RecommendFormState {
  budget: string;
  speed: Speed | "";
  cuisine: Cuisine | "";
  setBudget: (budget: string) => void;
  setSpeed: (speed: Speed | "") => void;
  setCuisine: (cuisine: Cuisine | "") => void;
  reset: () => void;
}

export const useRecommendFormStore = create<RecommendFormState>()(
  persist(
    (set) => ({
      budget: "",
      speed: "",
      cuisine: "",
      setBudget: (budget) => set({ budget }),
      setSpeed: (speed) => set({ speed }),
      setCuisine: (cuisine) => set({ cuisine }),
      reset: () => set({ budget: "", speed: "", cuisine: "" }),
    }),
    {
      name: "eatpicker_recommend_form",
    },
  ),
);

// frontend/src/stores/useRecommendFormStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cuisine, Speed } from "../types/restaurant";
import type { RecommendResponse } from "../types/recommend";

interface RecommendFormState {
  budget: string;
  speed: Speed | "";
  cuisine: Cuisine | "";
  recommendResult: RecommendResponse | null;
  recommendErrorMessage: string | null;
  setBudget: (budget: string) => void;
  setSpeed: (speed: Speed | "") => void;
  setCuisine: (cuisine: Cuisine | "") => void;
  setRecommendResult: (result: RecommendResponse | null) => void;
  setRecommendErrorMessage: (message: string | null) => void;
  reset: () => void;
}

export const useRecommendFormStore = create<RecommendFormState>()(
  persist(
    (set) => ({
      budget: "",
      speed: "",
      cuisine: "",
      recommendResult: null,
      recommendErrorMessage: null,
      setBudget: (budget) => set({ budget }),
      setSpeed: (speed) => set({ speed }),
      setCuisine: (cuisine) => set({ cuisine }),
      setRecommendResult: (recommendResult) => set({ recommendResult }),
      setRecommendErrorMessage: (recommendErrorMessage) =>
        set({ recommendErrorMessage }),
      reset: () =>
        set({
          budget: "",
          speed: "",
          cuisine: "",
          recommendResult: null,
          recommendErrorMessage: null,
        }),
    }),
    {
      name: "eatpicker_recommend_form",
    },
  ),
);

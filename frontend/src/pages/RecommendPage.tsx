// src/pages/RecommendPage.tsx
import { FormEvent, useState } from "react";
import { useRecommend } from "../hooks/useRecommend";
import { CUISINE_OPTIONS, SPEED_OPTIONS } from "../constants/restaurant";
import { Cuisine, Speed } from "../types/restaurant";
import { useRecommendFormStore } from "../stores/useRecommendFormStore";

interface FormErrors {
  budget?: string;
  speed?: string;
  cuisine?: string;
}

export function RecommendPage() {
  const {
    budget,
    speed,
    cuisine,
    setBudget,
    setSpeed,
    setCuisine,
    // reset, // 之後如果想加「Clear form」可以用
  } = useRecommendFormStore();

  const [formErrors, setFromErrors] = useState<FormErrors>({});

  const { getRecommend, data, isLoading, isApiError, apiError } =
    useRecommend();

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    const budgetNumber = Number(budget);
    if (!budget) {
      nextErrors.budget = "Please enter a budget amount";
    } else if (Number.isNaN(budgetNumber) || budgetNumber <= 0) {
      nextErrors.budget = "Budget must be a number greater than 0";
    }

    if (!speed) {
      nextErrors.speed = "Please select a speed";
    }

    if (!cuisine) {
      nextErrors.cuisine = "Please select a cuisine";
    }

    setFromErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    getRecommend({
      budget: Number(budget),
      speed: speed as Speed,
      cuisine: cuisine as Cuisine,
    });
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-3xl bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6 dark:bg-stone-900/80">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">
            Recommend restaurant
          </h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Tell us your budget, speed and cuisine. We will pick one restaurant
            for you today.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Budget */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-800 dark:text-stone-100">
            Budget (HKD)
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2.5 focus-within:border-teal-600 focus-within:bg-teal-600/10 dark:border-stone-700 dark:bg-stone-800 dark:focus-within:border-teal-300">
            <span className="text-sm text-stone-500 dark:text-stone-400">
              $
            </span>
            <input
              type="number"
              min={1}
              step={1}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="h-7 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400 dark:placeholder:text-stone-500"
              placeholder="e.g. 50"
            />
          </div>
          {formErrors.budget && (
            <p className="text-xs text-red-500">{formErrors.budget}</p>
          )}
        </div>

        {/* Speed */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-800 dark:text-stone-100">
            Speed
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SPEED_OPTIONS.map((option) => {
              const isActive = speed === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSpeed(option.value as Speed)}
                  className={[
                    "flex flex-col items-start gap-0.5 rounded-2xl border px-3 py-2.5 text-left text-sm transition",
                    isActive
                      ? "border-teal-600 bg-teal-600/10 text-teal-800 dark:border-teal-300 dark:bg-teal-300/10 dark:text-teal-100"
                      : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100",
                  ].join(" ")}
                >
                  <span className="font-semibold">{option.label}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {option.hint}
                  </span>
                </button>
              );
            })}
          </div>
          {formErrors.speed && (
            <p className="text-xs text-red-500">{formErrors.speed}</p>
          )}
        </div>

        {/* Cuisine */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-stone-800 dark:text-stone-100">
            Cuisine
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CUISINE_OPTIONS.map((c) => {
              const label = c.label;
              const value = c.value;
              const isActive = cuisine === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCuisine(value as Cuisine)}
                  className={[
                    "rounded-2xl border px-3 py-2 text-sm transition",
                    isActive
                      ? "border-teal-600 bg-teal-600/10 text-teal-800 dark:border-teal-300 dark:bg-teal-300/10 dark:text-teal-100"
                      : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-300 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
          {formErrors.cuisine && (
            <p className="text-xs text-red-500">{formErrors.cuisine}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Fill all three fields and we will pick one restaurant for you.
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-2xl 
              bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white 
              shadow-sm transition hover:bg-teal-800 
              disabled:bg-stone-500 disabled:text-stone-200 
              disabled:shadow-none disabled:hover:bg-stone-500 
              disabled:cursor-not-allowed 
              dark:bg-teal-500 dark:hover:bg-teal-400"
          >
            {isLoading ? "Finding..." : "Find restaurant"}
          </button>
        </div>
      </form>

      {/* Result */}
      <section className="mt-2">
        {isApiError && (
          <p className="rounded-2xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/60 dark:bg-red-950/40 dark:text-red-200">
            {apiError?.message}
          </p>
        )}

        {data && (
          <div className="mt-3 rounded-3xl border border-stone-200 bg-gradient-to-br from-amber-50 to-stone-50 p-4 shadow-sm dark:border-stone-700 dark:from-stone-900 dark:to-stone-950">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 dark:text-teal-300">
              Today&apos;s pick
            </p>
            <h2 className="mt-1 text-xl font-bold text-stone-900 dark:text-stone-50">
              {data.name}
            </h2>
            <div className="mt-2 text-sm text-stone-600 dark:text-stone-300">
              {data.address}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-200">
              <span className="rounded-full bg-stone-800 px-3 py-1">
                Avg price: {data.avgPrice}
              </span>
              <span className="rounded-full bg-stone-800 px-3 py-1">
                Speed: {data.speed}
              </span>
              <span className="rounded-full bg-stone-800 px-3 py-1">
                Cuisine: {data.cuisine}
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

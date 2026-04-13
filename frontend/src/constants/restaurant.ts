// frontend/src/constants/restaurant.ts
export const CUISINES = [
  "chinese",
  "congee",
  "noodle",
  "hotpot",
  "japanese",
  "korean",
  "western",
  "fastfood",
  "thai",
] as const;

export const CUISINE_OPTIONS = [
  { value: "congee", label: "Congee" },
  { value: "noodle", label: "Noodle" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "western", label: "Western" },
  { value: "fastfood", label: "Fast food" },
  { value: "thai", label: "Thai" },
  { value: "hotpot", label: "Hotpot" },
] as const;

export const SPEEDS = ["fast", "normal", "slow"] as const;

export const SPEED_OPTIONS = [
  { value: "fast", label: "Fast", hint: "Quick bite" },
  { value: "normal", label: "Normal", hint: "Standard time" },
  { value: "slow", label: "Slow", hint: "Take it easy" },
] as const;

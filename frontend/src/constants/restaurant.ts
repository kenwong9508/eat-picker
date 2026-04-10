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
export type Cuisine = (typeof CUISINES)[number];

export const SPEEDS = ["fast", "normal", "slow"] as const;
export type Speed = (typeof SPEEDS)[number];

export const SPEED_OPTIONS: {
  value: Speed;
  label: string;
  hint: string;
}[] = [
  { value: "fast", label: "Fast", hint: "Quick bite" },
  { value: "normal", label: "Normal", hint: "Standard time" },
  { value: "slow", label: "Slow", hint: "Take it easy" },
];

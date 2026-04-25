import { capitalize } from ".";
import type { Restaurant } from "../types/restaurant";

export function formatSpeed(speed: Restaurant["speed"]): string {
  return capitalize(speed);
}

export function formatCuisine(cuisine: Restaurant["cuisine"]): string {
  if (cuisine === "fastfood") return "Fast food";
  return capitalize(cuisine);
}

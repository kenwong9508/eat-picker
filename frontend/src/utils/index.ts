export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const isEmptyObject = (obj: unknown): obj is Record<string, never> =>
  !!obj && typeof obj === "object" && Object.keys(obj).length === 0;

export function formatCurrency(value: number): string {
  return `HK$${Math.round(value)}`;
}

export function capitalize(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const isEmptyArray = (value: unknown): value is [] => {
  return Array.isArray(value) && value.length === 0;
};

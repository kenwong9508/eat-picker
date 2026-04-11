export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const isEmptyObject = (obj: unknown): obj is Record<string, never> =>
  !!obj && typeof obj === "object" && Object.keys(obj).length === 0;

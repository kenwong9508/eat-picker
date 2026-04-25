// src/hooks/useCloseOnDesktop.ts
import { useEffect } from "react";

export function useCloseOnDesktop(onDesktop: () => void) {
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onDesktop();
      }
    };

    media.addEventListener("change", handleDesktop);
    return () => media.removeEventListener("change", handleDesktop);
  }, []);
}

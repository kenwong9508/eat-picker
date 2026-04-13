import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { cn } from "../utils";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
};

type ToastContextValue = {
  showToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    setToasts((prev) => [
      ...prev,
      { ...toast, id: Date.now() + Math.random() },
    ]);
    // 自動 5 秒後消失
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast stack */}
      <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-end pr-4 sm:pr-8">
        <div className="flex max-w-md flex-col gap-3">
          {toasts.map((toast) => {
            const colorClasses =
              toast.type === "success"
                ? "border-emerald-500/70 bg-emerald-500/15 text-emerald-50"
                : toast.type === "error"
                  ? "border-red-500/70 bg-red-500/15 text-red-50"
                  : "border-stone-500/70 bg-stone-800 text-stone-50";

            const badge =
              toast.type === "success"
                ? "bg-emerald-500 text-emerald-950"
                : toast.type === "error"
                  ? "bg-red-500 text-red-50"
                  : "bg-stone-500 text-stone-50";

            const icon =
              toast.type === "success"
                ? "✓"
                : toast.type === "error"
                  ? "!"
                  : "i";

            return (
              <div
                key={toast.id}
                className={cn(
                  "pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur",
                  colorClasses,
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                    badge,
                  )}
                >
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{toast.title}</p>
                  {toast.message && (
                    <p className="mt-1 text-[13px] text-stone-100/85">
                      {toast.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

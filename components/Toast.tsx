"use client";
import React, { createContext, useCallback, useContext, useState } from "react";

type ToastInput = {
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
  duration?: number;
};

type ToastItem = ToastInput & { id: number };

const ToastCtx = createContext<{ toast: (t: ToastInput) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((t: ToastInput) => {
    const id = Date.now() + Math.random();
    const duration = t.duration ?? 2500;
    setToasts((prev) => [...prev, { ...t, id }]);
    if (duration > 0) {
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), duration);
    }
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] space-y-3">
        {toasts.map((t) => {
          const tone =
            t.variant === "success" ? ["border-green-300", "text-green-600"] :
            t.variant === "error"   ? ["border-red-300", "text-red-600"] :
                                      ["border-gray-200", "text-gray-600"];
          const icon = t.variant === "success" ? "✓" : t.variant === "error" ? "!" : "ℹ︎";
          return (
            <div key={t.id} className={`w-80 max-w-[90vw] rounded-lg border bg-white shadow-lg p-4 flex items-start gap-3 ${tone[0]}`}>
              <div className={`mt-0.5 text-lg ${tone[1]}`}>{icon}</div>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{t.title}</div>
                {t.description && <div className="text-sm text-gray-600 truncate">{t.description}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}
"use client";

import { ThemeProvider } from "../contexts/ThemeContext";
import { AppDataProvider } from "../contexts/AppDataContext";
import { ToastProvider } from "../contexts/ToastContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppDataProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AppDataProvider>
    </ThemeProvider>
  );
}

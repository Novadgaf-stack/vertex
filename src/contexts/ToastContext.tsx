"use client";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

import { cn } from '../lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-center gap-3 min-w-[300px] max-w-md px-4 py-3 rounded-lg shadow-lg border pointer-events-auto transform transition-all animate-in slide-in-from-bottom-5",
              {
                'bg-surface-elevated border-success/20 text-text-primary': toast.type === 'success',
                'bg-surface-elevated border-error/20 text-text-primary': toast.type === 'error',
                'bg-surface-elevated border-border text-text-primary': toast.type === 'info',
              }
            )}
          >
            {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-success shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-error shrink-0" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-info shrink-0" />}
            
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

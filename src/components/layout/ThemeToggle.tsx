"use client";
import { Sun, Monitor, Moon } from "lucide-react";
import React from 'react';

import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex bg-surface-alt p-1 rounded-lg border border-border">
      <button
        onClick={() => setTheme('light')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          theme === 'light' ? "bg-surface shadow-sm text-primary" : "text-text-muted hover:text-text-primary"
        )}
        title="Light theme"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          theme === 'system' ? "bg-surface shadow-sm text-primary" : "text-text-muted hover:text-text-primary"
        )}
        title="System theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          theme === 'dark' ? "bg-surface shadow-sm text-primary" : "text-text-muted hover:text-text-primary"
        )}
        title="Dark theme"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}

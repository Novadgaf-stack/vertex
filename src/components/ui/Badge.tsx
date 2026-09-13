"use client";
import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        {
          'bg-success/10 text-success border-success/20': variant === 'success',
          'bg-warning/10 text-warning border-warning/20': variant === 'warning',
          'bg-error/10 text-error border-error/20': variant === 'error',
          'bg-info/10 text-info border-info/20': variant === 'info',
          'bg-surface-alt text-text-secondary border-border': variant === 'neutral',
        },
        className
      )}
      {...props}
    />
  );
}

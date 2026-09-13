"use client";
import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            'bg-primary text-white hover:bg-primary-hover shadow-sm': variant === 'primary',
            'bg-surface-alt text-text-primary border border-border hover:bg-border/30 shadow-sm': variant === 'secondary',
            'border border-border bg-transparent hover:bg-surface-alt text-text-primary': variant === 'outline',
            'bg-transparent hover:bg-surface-alt text-text-primary': variant === 'ghost',
            'bg-error text-white hover:bg-error/90 shadow-sm': variant === 'danger',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-11 px-8 text-lg': size === 'lg',
            'h-10 w-10 p-2': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

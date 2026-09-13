"use client";
import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ className, src, fallback, size = 'md', ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-primary-soft text-primary font-medium items-center justify-center",
        {
          'h-8 w-8 text-xs': size === 'sm',
          'h-10 w-10 text-sm': size === 'md',
          'h-12 w-12 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt="Avatar" className="h-full w-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}

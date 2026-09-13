"use client";
import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-2xl border border-border shadow-sm overflow-hidden transition-colors",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("px-6 py-5 border-b border-border/50", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-text-primary", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-text-muted mt-1", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("px-6 py-4 bg-surface-alt border-t border-border/50 transition-colors", className)}
      {...props}
    />
  );
}

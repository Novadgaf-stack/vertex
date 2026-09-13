"use client";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '../../lib/utils';

import { MetricData } from '../../types';

interface MetricCardProps {
  data: MetricData;
  className?: string;
}

export function MetricCard({ data, className }: MetricCardProps) {
  const isPositive = data.trend === 'up';
  const isNegative = data.trend === 'down';
  const isNeutral = data.trend === 'neutral';

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-text-secondary">{data.title}</p>
            <h4 className="text-2xl font-bold text-text-primary mt-2">{data.value}</h4>
          </div>
          <div className={cn(
            "flex items-center px-2 py-1 rounded-md text-xs font-medium",
            isPositive ? "bg-success/10 text-success" : 
            isNegative ? "bg-error/10 text-error" : 
            "bg-surface-alt text-text-secondary"
          )}>
            {isPositive && <ArrowUpRight className="h-3 w-3 mr-1" />}
            {isNegative && <ArrowDownRight className="h-3 w-3 mr-1" />}
            {isNeutral && <Minus className="h-3 w-3 mr-1" />}
            {Math.abs(data.change)}%
          </div>
        </div>
        <p className="text-xs text-text-muted mt-3">{data.description}</p>
      </CardContent>
    </Card>
  );
}

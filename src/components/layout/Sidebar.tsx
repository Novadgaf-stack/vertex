"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  CreditCard, 
  Package, 
  Settings, 
  LogOut,
  Hexagon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useToast } from '../../contexts/ToastContext';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: LineChart },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Transactions', path: '/transactions', icon: CreditCard },
  { name: 'Products', path: '/products', icon: Package },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = "/" as string;
  const { addToast } = useToast();

  const handleLogout = () => {
    addToast('Logging out... (Simulated)', 'info');
  };

  return (
    <aside className={cn("flex flex-col w-64 bg-surface border-r border-border h-full transition-colors", className)}>
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <Hexagon className="h-6 w-6 text-primary fill-primary/20" />
        <span className="ml-3 font-bold text-xl tracking-tight text-text-primary">Vertex</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        <div className="text-xs font-semibold text-text-muted mb-2 px-2 uppercase tracking-wider">Main Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border",
                isActive 
                  ? "bg-primary-soft text-primary border-primary/20 shadow-sm" 
                  : "text-text-secondary border-transparent hover:bg-surface-alt hover:text-text-primary"
              )}
            >
              <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-text-muted")} />
              {item.name}
            </Link>
          );
        })}

        <div className="mt-8 text-xs font-semibold text-text-muted mb-2 px-2 uppercase tracking-wider">System</div>
        <Link
          href="/settings"
          className={cn(
            "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border",
            pathname === '/settings' 
              ? "bg-primary-soft text-primary border-primary/20 shadow-sm" 
              : "text-text-secondary border-transparent hover:bg-surface-alt hover:text-text-primary"
          )}
        >
          <Settings className={cn("h-5 w-5 mr-3", pathname === '/settings' ? "text-primary" : "text-text-muted")} />
          Settings
        </Link>
      </div>

      <div className="p-4 border-t border-border shrink-0">
        <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-alt transition-colors">
          <LogOut className="h-5 w-5 mr-3 text-text-muted" />
          Log out
        </button>
      </div>
    </aside>
  );
}

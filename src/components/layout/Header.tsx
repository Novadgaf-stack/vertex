"use client";
import { Menu, Search, Bell } from "lucide-react";
import React, { useEffect, useRef } from 'react';

import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-8 shrink-0 z-10 relative">
        <div className="flex items-center flex-1">
          <button 
            className="mr-4 lg:hidden p-2 -ml-2 text-text-secondary hover:bg-surface-alt rounded-md"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="max-w-md w-full hidden md:block relative">
            <Input 
              ref={searchInputRef}
              type="search" 
              placeholder="Search customers, transactions..." 
              icon={<Search className="h-4 w-4" />}
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <span className="text-xs text-text-muted font-medium px-1.5 py-0.5 rounded border border-border bg-surface-alt">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <ThemeToggle />
          
          <button className="p-2 text-text-secondary hover:bg-surface-alt rounded-full relative transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error ring-2 ring-surface"></span>
          </button>
          
          <div className="h-8 w-px bg-border mx-1"></div>
          
          <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-full hover:bg-surface-alt transition-colors">
            <Avatar fallback="AL" src="https://i.pravatar.cc/150?u=admin" size="sm" />
            <div className="hidden md:block text-sm">
              <p className="font-medium text-text-primary leading-none">Alex Lindemann</p>
              <p className="text-xs text-text-muted mt-1 leading-none">Admin</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

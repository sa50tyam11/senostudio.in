import React from 'react';
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-3xl glass-panel p-8 transition-all hover:bg-white/10 hover:border-white/20", className)}>
      {children}
    </div>
  );
}

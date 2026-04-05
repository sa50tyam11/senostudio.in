import React from 'react';
import { cn } from "@/lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("inline-flex items-center rounded-full glass-panel px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#a1a1aa] transition-colors", className)}>
      {children}
    </div>
  );
}

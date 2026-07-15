import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'primary-light' | 'secondary-light' | 'primary-dark' | 'accent';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 transition-transform hover:scale-[1.03]";
  const padding = "h-11 px-8 py-2"; 
  
  const variants = {
    primary: "bg-[var(--color-ivory)] text-[var(--color-obsidian)] hover:bg-[var(--color-sand)]",
    secondary: "bg-[var(--color-midnight)] text-[var(--color-ivory)] hover:bg-[var(--color-obsidian)]",
    glass: "glass-panel text-white hover:bg-white/10",
    'primary-light': "bg-[var(--color-obsidian)] text-[var(--color-ivory)] hover:opacity-90",
    'secondary-light': "bg-transparent text-[var(--color-ink)] border border-[var(--border-light)] hover:bg-black/5",
    'primary-dark': "bg-[var(--color-ivory)] text-[var(--color-ink)] hover:opacity-90",
    'accent': "bg-[var(--color-violet)] text-[var(--color-ivory)] hover:opacity-90"
  };

  return (
    <button className={cn(base, padding, variants[variant], className)} {...props} />
  );
}

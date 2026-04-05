import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 transition-transform hover:scale-[1.03]";
  const padding = "h-11 px-8 py-2"; 
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    glass: "glass-panel text-white hover:bg-white/10"
  };

  return (
    <button className={cn(base, padding, variants[variant], className)} {...props} />
  );
}

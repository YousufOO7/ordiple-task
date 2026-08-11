"use client";

import { cn } from "@/app/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary:
        "bg-amber-500 hover:bg-amber-600 text-zinc-950 focus:ring-amber-500",
      secondary:
        "bg-zinc-800 hover:bg-zinc-700 text-white focus:ring-zinc-600",
      outline:
        "border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-900 text-white focus:ring-amber-500/50",
      danger:
        "bg-red-600/90 hover:bg-red-600 text-white focus:ring-red-500",
      ghost:
        "hover:bg-zinc-800 text-zinc-300 hover:text-white focus:ring-zinc-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

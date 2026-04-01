"use client";

import { Button as AriaButton } from "react-aria-components";
import { cn } from "@/lib/cn";

const variants = {
  solid: "bg-black text-white border-black hover:bg-white hover:text-black dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white",
  outline: "bg-transparent text-black border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black",
};

export function Button({ className, variant = "solid", ...props }) {
  return (
    <AriaButton
      className={cn(
        "inline-flex items-center justify-center border-2 px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

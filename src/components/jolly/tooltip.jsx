"use client";

import { Tooltip as AriaTooltip, TooltipTrigger } from "react-aria-components";
import { cn } from "@/lib/cn";

export function Tooltip({ trigger, children, className }) {
  return (
    <TooltipTrigger delay={120} closeDelay={120}>
      {trigger}
      <AriaTooltip
        offset={8}
        className={cn(
          "border-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-black dark:border-white dark:bg-black dark:text-white",
          className
        )}
      >
        {children}
      </AriaTooltip>
    </TooltipTrigger>
  );
}

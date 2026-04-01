import { cn } from "@/lib/cn";

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex border border-black px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest dark:border-white",
        className
      )}
      {...props}
    />
  );
}

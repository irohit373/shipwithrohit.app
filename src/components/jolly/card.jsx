import { cn } from "@/lib/cn";

export function Card({ className, ...props }) {
  return <article className={cn("border-2 border-black bg-white p-4 dark:border-white dark:bg-black", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-xl font-black uppercase tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("mt-2 font-bold leading-loose", className)} {...props} />;
}

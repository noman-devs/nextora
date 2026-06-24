import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "ghost"
}

export function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1 text-xs font-medium border",
        variant === "primary" && "border-primary/30 bg-primary/10 text-primary",
        variant === "secondary" && "border-secondary/30 bg-secondary/10 text-secondary",
        variant === "ghost" && "border-white/10 bg-white/5 text-muted",
        className
      )}
      {...props}
    />
  )
}

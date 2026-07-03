import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "ghost"
}

export function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium border",
        variant === "primary" && "border-primary/20 bg-primary/5 text-primary",
        variant === "secondary" && "border-primary/20 bg-primary/5 text-primary",
        variant === "ghost" && "border-border bg-white text-muted",
        className
      )}
      {...props}
    />
  )
}

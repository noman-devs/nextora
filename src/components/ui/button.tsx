"use client"

import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-[#E5531A] shadow-sm hover:shadow-md active:scale-[0.98]",
        secondary:
          "bg-transparent border-2 border-light text-light hover:bg-light hover:text-white active:scale-[0.98]",
        ghost:
          "text-muted hover:text-light hover:bg-black/5",
        outline:
          "border border-border text-light bg-transparent hover:bg-light hover:text-white hover:border-light",
        dark: "bg-white text-light border border-border hover:bg-black/5",
      },
      size: {
        sm: "h-9 px-5 text-xs",
        md: "h-11 px-7 text-sm",
        lg: "h-12 px-9 text-base",
        xl: "h-14 px-11 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

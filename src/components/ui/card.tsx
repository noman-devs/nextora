import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-border bg-white transition-all duration-300",
        hover && "hover:shadow-lg hover:shadow-black/[0.04] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-8 pb-0", className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-8", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-8 pt-0", className)} {...props} />
}

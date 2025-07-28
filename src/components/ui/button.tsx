import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-lg font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-restaurant-primary text-white hover:bg-restaurant-primary/90 shadow-lg",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-restaurant-primary bg-background text-restaurant-primary hover:bg-restaurant-primary hover:text-white",
        secondary:
          "bg-restaurant-secondary text-restaurant-primary hover:bg-restaurant-secondary/90 shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        tablet: "bg-restaurant-primary text-white hover:bg-restaurant-primary/90 min-h-14 px-8 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300",
        "tablet-secondary": "bg-restaurant-secondary text-restaurant-primary hover:bg-restaurant-secondary/90 min-h-14 px-8 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

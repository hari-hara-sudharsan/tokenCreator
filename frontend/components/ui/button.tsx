import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

type ButtonVariant = "default" | "outline"
type ButtonSize = "default" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const variantClasses =
      variant === "outline"
        ? "border border-current bg-transparent"
        : ""

    const sizeClasses =
      size === "lg"
        ? "h-12 px-8 text-lg"
        : "h-10 px-4 text-sm"

    return (
      <Comp
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 ${variantClasses} ${sizeClasses} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }


import * as React from "react"

export function Card({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border bg-background text-foreground ${className}`}
      {...props}
    />
  )
}

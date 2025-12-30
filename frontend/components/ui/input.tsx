import * as React from "react"

export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none ${className}`}
      {...props}
    />
  )
}

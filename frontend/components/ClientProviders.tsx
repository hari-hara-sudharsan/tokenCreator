"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const WalletProvider = dynamic(
  () => import("@/context/WalletContext").then((m) => m.WalletProvider),
  { ssr: false }
)

export function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={null}>
      <WalletProvider>{children}</WalletProvider>
    </Suspense>
  )
}

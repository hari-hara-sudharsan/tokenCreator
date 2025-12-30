"use client"

import { Suspense } from "react"
import nextDynamic from "next/dynamic"

/**
 * 🚫 WalletProvider uses browser-only hooks (useSearchParams / window.ethereum)
 * ✅ Must be loaded CLIENT-ONLY with SSR disabled
 */
const WalletProvider = nextDynamic(
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

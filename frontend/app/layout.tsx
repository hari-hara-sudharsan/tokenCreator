"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import nextDynamic from "next/dynamic"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

/**
 * 🚫 WalletProvider uses browser-only hooks (useSearchParams / window.ethereum)
 * ✅ Must be loaded CLIENT-ONLY with SSR disabled
 */
const WalletProvider = nextDynamic(
  () => import("@/context/WalletContext").then((m) => m.WalletProvider),
  { ssr: false }
)

/**
 * 🚫 Disable static prerendering globally
 * ✅ Required for Web3 + wallet-based apps
 */
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "SafeMint - Secure Token Launch Platform",
  description:
    "Launch your tokens safely with locked liquidity, fair launch mechanisms, and community trust scores. Built for transparency and security.",
  generator: "v0.app",
  keywords: [
    "Web3",
    "Token Launch",
    "DeFi",
    "Crypto",
    "Blockchain",
    "Fair Launch",
    "Liquidity Lock",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} font-sans antialiased`}>
        {/* ✅ Suspense boundary REQUIRED */}
        <Suspense fallback={null}>
          <WalletProvider>{children}</WalletProvider>
        </Suspense>

        <Analytics />
      </body>
    </html>
  )
}

"use client"

import { Suspense, useState } from "react"
import nextDynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { CreateTokenForm } from "@/components/create-token"
import { AddLiquiditySection } from "@/components/add-liquidity"
import { TrustScoreCard } from "@/components/trust-score"
import { Footer } from "@/components/footer"
import { MyTokens } from "@/components/my-tokens"

const Header = nextDynamic(
  () => import("@/components/header").then((mod) => mod.Header),
  { ssr: false }
)

export const dynamic = "force-dynamic"

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="pt-16">
        <HeroSection />
        <FeaturesGrid />

        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <CreateTokenForm onDeployed={setSelectedToken} />
            <AddLiquiditySection tokenAddress={selectedToken} />
          </div>

          <div className="max-w-2xl mx-auto">
            <TrustScoreCard tokenAddress={selectedToken} />
          </div>

          <div className="max-w-2xl mx-auto mt-12">
            <MyTokens onSelect={setSelectedToken} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
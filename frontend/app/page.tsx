"use client"

import { Suspense } from "react"
import nextDynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { CreateTokenForm } from "@/components/create-token"
import { AddLiquiditySection } from "@/components/add-liquidity"
import { TrustScoreCard } from "@/components/trust-score"
import { Footer } from "@/components/footer"
import { MyTokens } from "@/components/my-tokens"
// import { TokenPreview } from "@/components/create-token/TokenPreview"
// import { SecurityInfo } from "@/components/create-token/SecurityInfo"

// 🚨 IMPORTANT: client-only header (NO SSR)
const Header = nextDynamic(() => import("@/components/header").then((mod) => mod.Header), {
  ssr: false,
})

// 🚫 Disable prerender completely for home
export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ✅ Header is now browser-only */}
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="pt-16">
        <HeroSection />
        <FeaturesGrid />

        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div id="create">
              <CreateTokenForm />
            </div>
            <div id="add-liquidity">
              <AddLiquiditySection />
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <TrustScoreCard />
          </div>

          <div className="max-w-2xl mx-auto mt-12">
            <MyTokens />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <CreateTokenForm />

            <div>
              {/* TODO: Connect state to CreateTokenForm */}
              {/* <TokenPreview name="" symbol="" /> */}
              {/* <SecurityInfo /> */}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { CreateTokenForm } from "@/components/create-token"
import { AddLiquiditySection } from "@/components/add-liquidity"
import { TrustScoreCard } from "@/components/trust-score"
import { Footer } from "@/components/footer"
import { MyTokens } from "@/components/my-tokens"
export const dynamic = "force-dynamic"




export default function Home() {
  const [showWalletModal, setShowWalletModal] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ✅ THIS WAS MISSING */}
      <Header />

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
        </div>
      </main>

      <Footer />
    </div>
  )
}



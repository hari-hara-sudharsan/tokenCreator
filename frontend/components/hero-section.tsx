"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()

  const handleLaunchToken = () => {
    const el = document.getElementById("create")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleViewDocs = () => {
    router.push("/docs")
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#0A0A0A] to-black pt-16 py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-gray-300">
              Secure, Transparent, Community-Driven
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Launch Your Token{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#00BFFF] bg-clip-text text-transparent">
              Safely &amp; Fairly
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            Create transparent token launches with locked liquidity, anti-rug-pull
            protection, and community trust scores powered by blockchain
            verification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleLaunchToken}
              className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#D4AF37] hover:to-[#00BFFF] text-black font-semibold text-lg transition-all duration-300 group"
            >
              Launch Token
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleViewDocs}
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 bg-transparent"
            >
              View Documentation
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">
                500+
              </div>
              <div className="text-sm text-gray-400">Tokens Launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#32CD32] mb-2">
                $10M+
              </div>
              <div className="text-sm text-gray-400">Liquidity Locked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#00BFFF] mb-2">
                99.8%
              </div>
              <div className="text-sm text-gray-400">Trust Score Avg</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import Link from "next/link"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"
import { calculateTrustScore } from "@/lib/trustScore"
import { getTotalShares } from "@/lib/communityAnalytics"
import {
  calculateTrendingScore
} from "@/lib/trustScore"
import { Flame } from "lucide-react"
import {
    applyTimeDecay,
} from "@/lib/trustScore"




type ExplorerToken = {
  token: string
  score: number
  level: "high" | "medium" | "low"
  shares: number
}

type Tab = "trending" | "trusted" | "new"

export default function ExplorerPage() {
  const [tokens, setTokens] = useState<ExplorerToken[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>("trending")

  useEffect(() => {
    const loadTokens = async () => {
      try {
        if (!window.ethereum) {
          setLoading(false)
          return
        }

        const provider = new ethers.BrowserProvider(window.ethereum)
        const factory = new ethers.Contract(
          SAFEMINT_FACTORY_ADDRESS,
          SAFEMINT_FACTORY_ABI,
          provider
        )

        const allTokens: string[] = await factory.getAllTokens()
        const now = Math.floor(Date.now() / 1000)

        const rows = await Promise.all(
          allTokens.map(async (token) => {
            try {
              const info = await factory.tokenInfo(token)
              
              const shares = getTotalShares(token)
              const trust = calculateTrustScore(info, now)

// token creation proxy = lockExpiry - lockDuration
const createdAt =
  Number(info.lockExpiry) - 180 * 24 * 60 * 60 // approx 6 months

const boostedTrust = applyTimeDecay(trust.score, createdAt, now)

const trendingScore = calculateTrendingScore(token, boostedTrust)


              return {
                token,
                score: trust.score + shares * 2, // 🔥 community boost
                level: trust.level,
                shares,
              }
            } catch {
              return null
            }
          })
        )

        setTokens(rows.filter(Boolean) as ExplorerToken[])
      } catch (err) {
        console.error("Explorer load failed:", err)
      } finally {
        setLoading(false)
      }
    }

    loadTokens()
  }, [])

  const visibleTokens = [...tokens].sort((a, b) => {
    if (tab === "trusted") return b.score - a.score
    if (tab === "new") return 0
    return b.score - a.score // trending
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white py-20 text-center">
        <p className="text-gray-400">Loading explorer…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">

        <h1 className="text-3xl font-bold text-[#D4AF37]">
          Token Explorer
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 text-sm">
          {["trending", "trusted", "new"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as Tab)}
              className={tab === t ? "text-[#D4AF37]" : "text-gray-400"}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {visibleTokens.map((t) => (
          <Link key={t.token} href={`/token/${t.token}`}>
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 p-4 rounded-lg flex justify-between items-center hover:border-[#D4AF37] transition">

              <div>
                <p className="text-xs text-gray-400">Token</p>
                <p className="text-xs break-all">{t.token}</p>

                {/* 🔥 Badges */}
                <div className="flex gap-2 mt-2 text-xs">
                  {t.shares > 0 && (
                    <span className="text-orange-400">🔥 Trending</span>
                  )}
                  {t.level === "high" && (
                    <span className="text-green-400">✅ Trusted</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400">Score</p>
                <div className="flex items-center justify-end gap-2">
  {t.score >= 80 && (
    <span className="flex items-center gap-1 text-orange-500 animate-pulse text-sm">
      <Flame className="w-4 h-4" />
      Trending
    </span>
  )}

  <p
    className="font-bold"
    style={{
      color:
        t.level === "high"
          ? "#32CD32"
          : t.level === "medium"
          ? "#FFD700"
          : "#FF4500",
    }}
  >
    {t.score} / 100
  </p>
</div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


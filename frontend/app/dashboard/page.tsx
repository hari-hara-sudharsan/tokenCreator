"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import {
  ShieldCheck,
  Lock,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react"
import { useWallet } from "@/context/WalletContext"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"
import { getCache, setCache } from "@/lib/cache"
import Link from "next/link"
import { calculateTrustScore } from "@/lib/trustScore"


type TokenRow = {
  token: string
  liquidityAdded: boolean
  lockExpiry: number
  score: number
}

export default function DashboardPage() {
  const { address } = useWallet()
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState<TokenRow[]>([])

  useEffect(() => {
    if (!address || !window.ethereum) {
      setLoading(false)
      return
    }

    const loadDashboard = async () => {
      try {
        /* 1️⃣ Wallet-specific cache */
        const cacheKey = `my-tokens-${address}`
        const cached = getCache<TokenRow[]>(cacheKey)
        if (cached) {
          setTokens(cached)
          setLoading(false)
          return
        }

        /* 2️⃣ Fetch from blockchain */
        const provider = new ethers.BrowserProvider(window.ethereum as any)
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

              if (info.creator.toLowerCase() !== address.toLowerCase()) {
                return null
              }

              const trust = calculateTrustScore(info, now)

              return {
                token,
                liquidityAdded: info.liquidityAdded,
                lockExpiry: Number(info.lockExpiry),
                score: trust.score,
              }
            } catch {
              return null
            }
          })
        )

        const filtered = rows.filter(Boolean) as TokenRow[]

        /* 3️⃣ Save to cache */
        setCache(cacheKey, filtered)

        setTokens(filtered)
      } catch (err) {
        console.error("Dashboard load failed:", err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [address])

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
        </div>

        {!address && (
          <p className="text-gray-400">
            Connect your wallet to view your tokens.
          </p>
        )}

        {loading ? (
          <p className="text-gray-400">Loading your tokens…</p>
        ) : tokens.length === 0 ? (
          <p className="text-gray-400">
            No tokens created from this wallet yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tokens.map((t, i) => (
              <Card
                key={i}
                className="bg-[#1A1A1A] border-[#D4AF37]/30 p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    Token Address
                  </span>
                  <Link
                    href={`/token/${t.token}`}
                    className="text-[#00BFFF] flex items-center gap-1 text-sm"
                  >
                    View <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-xs break-all text-white">
                  {t.token}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Trust Score</span>
                  <span className="font-bold text-[#32CD32]">
                    {t.score} / 100
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {t.liquidityAdded ? (
                    <CheckCircle className="w-5 h-5 text-[#32CD32]" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#FFD700]" />
                  )}
                  <span className="text-gray-400">
                    Liquidity Added
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-gray-400">
                    Lock Expiry:
                  </span>
                  <span className="text-sm">
                    {new Date(t.lockExpiry * 1000).toLocaleDateString()}
                  </span>
                </div>

                {/* ✅ COMMUNITY BUILDER (REAL TOKEN MODE) */}
                
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


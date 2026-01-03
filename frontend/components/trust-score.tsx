"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"
import { calculateTrustScore } from "@/lib/trustScore"

export function TrustScoreCard() {
  const [loading, setLoading] = useState(true)
  const [trustData, setTrustData] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      try {
        // ✅ DIRECT RPC — NOT METAMASK
        const provider = new ethers.JsonRpcProvider(
          "https://rpc2mainnet.qie.digital/"
        )

        const factory = new ethers.Contract(
          SAFEMINT_FACTORY_ADDRESS,
          SAFEMINT_FACTORY_ABI,
          provider
        )

        const tokens: string[] = await factory.getAllTokens()
        if (!tokens.length) return

        const info = await factory.tokenInfo(tokens[tokens.length - 1])
        setTrustData(calculateTrustScore(info))
      } catch (e) {
        console.error("Trust score failed:", e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return (
      <Card className="bg-[#1A1A1A] p-6 text-gray-400">
        Analyzing on-chain data…
      </Card>
    )
  }

  if (!trustData) return null

  return (
    <Card className="bg-[#1A1A1A] p-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-[#D4AF37]" />
        <h2 className="text-xl text-white">Trust Score</h2>
      </div>
      <p className="text-4xl font-bold mt-4">{trustData.score} / 100</p>
    </Card>
  )
}
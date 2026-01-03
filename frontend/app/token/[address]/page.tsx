"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Lock,
  User,
} from "lucide-react"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"
import { calculateTrustScore } from "@/lib/trustScore"
import { CommunityBuilder } from "@/components/community-builder"

type TrustLevel = "high" | "medium" | "low"

interface TokenDetail {
  token: string
  creator: string
  liquidityLock: string
  lockExpiry: number
  liquidityAdded: boolean
  score: number
  level: TrustLevel
}

export default function TokenDetailPage() {
  const { address } = useParams<{ address: string }>()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TokenDetail | null>(null)

  useEffect(() => {
    if (!address || !ethers.isAddress(address) || !window.ethereum) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as any)
        const factory = new ethers.Contract(
          SAFEMINT_FACTORY_ADDRESS,
          SAFEMINT_FACTORY_ABI,
          provider
        )

        const info = await factory.tokenInfo(address)

        const trust = calculateTrustScore(info)

        setData({
          token: info.token,
          creator: info.creator,
          liquidityLock: info.liquidityLock,
          lockExpiry: Number(info.lockExpiry),
          liquidityAdded: info.liquidityAdded,
          score: trust.score,
          level: trust.level,
        })
      } catch (err) {
        console.error("Token detail load failed:", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [address])

  const color =
    data?.level === "high"
      ? "#32CD32"
      : data?.level === "medium"
      ? "#FFD700"
      : "#FF4500"

  const formatTime = (ts: number) =>
    new Date(ts * 1000).toLocaleString()

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">
        {/* TOKEN DETAILS */}
        <Card className="bg-[#1A1A1A] border-[#D4AF37]/30 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
            <h1 className="text-2xl font-bold">Token Details</h1>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading on-chain data…</p>
          ) : data ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Trust Score</span>
                <span className="font-bold" style={{ color }}>
                  {data.score} / 100
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm break-all">
                <CheckCircle className="w-4 h-4 text-[#32CD32]" />
                <span className="text-gray-400">Token:</span>
                {data.token}
              </div>

              <div className="flex items-center gap-2 text-sm break-all">
                <User className="w-4 h-4 text-[#00BFFF]" />
                <span className="text-gray-400">Creator:</span>
                {data.creator}
              </div>

              <div className="flex items-center gap-2">
                {data.liquidityAdded ? (
                  <CheckCircle className="w-5 h-5 text-[#32CD32]" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-[#FFD700]" />
                )}
                <span className="text-gray-400">
                  Liquidity Added:
                </span>
                {data.liquidityAdded ? "Yes" : "No"}
              </div>

              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-gray-400">
                  Lock Expiry:
                </span>
                {formatTime(data.lockExpiry)}
              </div>
            </>
          ) : (
            <p className="text-red-400">
              Invalid or unknown token address
            </p>
          )}
        </Card>

        {/* COMMUNITY BUILDER — NEW LOCATION */}
        {data && (
          <Card className="bg-[#1A1A1A] border-[#00BFFF]/30 p-8">
            <CommunityBuilder tokenAddress={address} />
          </Card>
        )}
      </div>
    </div>
  )
}

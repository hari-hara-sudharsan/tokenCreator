"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"
import { getCache } from "@/lib/cache"
import { calculateTrustScore } from "@/lib/trustScore"


interface TrustScoreData {
  score: number
  level: "high" | "medium" | "low"
  checks: {
    name: string
    passed: boolean
    description: string
  }[]
}

export function TrustScoreCard() {
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [trustData, setTrustData] = useState<TrustScoreData | null>(null)
  


  useEffect(() => {
    const fetchTrustScore = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const factory = new ethers.Contract(
          SAFEMINT_FACTORY_ADDRESS,
          SAFEMINT_FACTORY_ABI,
          provider
        )

        const tokens: string[] = await factory.getAllTokens()
        if (tokens.length === 0) {
          setLoading(false)
          return
        }

        const tokenAddress = tokens[tokens.length - 1]
        const info = await factory.tokenInfo(tokenAddress)
        const trust = calculateTrustScore(info)
        setTrustData(trust)

      } catch (err) {
        console.error("Trust score fetch failed:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrustScore()
  }, [])

  const getScoreColor = (level: string) => {
    if (level === "high") return "#32CD32"
    if (level === "medium") return "#FFD700"
    return "#FF4500"
  }

  const getScoreLabel = (level: string) => {
    if (level === "high") return "High Trust"
    if (level === "medium") return "Medium Trust"
    return "Low Trust"
  }

  return (
    <Card id="trust" className="bg-[#1A1A1A] border-[#D4AF37]/30 p-8">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
        <h2 className="text-2xl font-bold text-white">
          Trust Score Indicator
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-400">Analyzing on-chain data…</p>
        </div>
      ) : trustData ? (
        <div className="space-y-6">
          {/* ✅ ALL UI BELOW IS UNCHANGED */}
          <div className="relative">
            <svg className="w-full h-48" viewBox="0 0 200 120">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#2A2A2A"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={getScoreColor(trustData.level)}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${(trustData.score / 100) * 251.2} 251.2`}
              />
              <text
                x="100"
                y="80"
                textAnchor="middle"
                className="text-5xl font-bold"
                fill={getScoreColor(trustData.level)}
              >
                {trustData.score}
              </text>
              <text x="100" y="95" textAnchor="middle" fill="#888">
                / 100
              </text>
            </svg>
          </div>

          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold"
              style={{
                backgroundColor: `${getScoreColor(trustData.level)}20`,
                color: getScoreColor(trustData.level),
              }}
            >
              {getScoreLabel(trustData.level)}
            </div>
          </div>

          <Button
            onClick={() => setExpanded(!expanded)}
            variant="outline"
            className="w-full border-[#D4AF37] text-[#D4AF37]"
          >
            {expanded ? (
              <>
                Hide Details <ChevronUp className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                View Detailed Report <ChevronDown className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>

          {expanded && (
            <div className="space-y-3 pt-4 border-t border-gray-700">
              {trustData.checks.map((check, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-black/50 rounded-lg border border-gray-700/50"
                >
                  {check.passed ? (
                    <CheckCircle className="w-5 h-5 text-[#32CD32] mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#FFD700] mt-0.5" />
                  )}
                  <div>
                    <p
                      className={`font-semibold ${check.passed
                          ? "text-[#32CD32]"
                          : "text-[#FFD700]"
                        }`}
                    >
                      {check.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {check.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </Card>
  )
}

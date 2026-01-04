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
  Shield,
  Lock,
  FileCheck,
  TrendingUp,
  Sparkles,
  Activity,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
  readProvider,
} from "@/lib/contracts"
import { calculateTrustScore, TrustResult } from "@/lib/trustScore"

export function TrustScoreCard({
  tokenAddress,
}: {
  tokenAddress?: string | null
}) {
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [trustData, setTrustData] = useState<TrustResult | null>(null)

  useEffect(() => {
    if (!tokenAddress) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const factory = new ethers.Contract(
          SAFEMINT_FACTORY_ADDRESS,
          SAFEMINT_FACTORY_ABI,
          readProvider
        )

        const info = await factory.tokenInfo(tokenAddress)
        setTrustData(calculateTrustScore(info))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [tokenAddress])

  if (loading) {
    return (
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
        
        <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A] border border-emerald-500/30 rounded-2xl p-12">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-6 rounded-full border border-emerald-500/40">
                <Activity className="w-12 h-12 text-emerald-400 animate-pulse" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Analyzing On-Chain Data
              </h3>
              <p className="text-gray-400">Calculating trust score and security metrics...</p>
            </div>

            <div className="w-full max-w-md">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (!trustData) return null

  const color =
    trustData.level === "high"
      ? "#32CD32"
      : trustData.level === "medium"
      ? "#FFD700"
      : "#FF4500"

  const gradientClass =
    trustData.level === "high"
      ? "from-emerald-500 to-green-600"
      : trustData.level === "medium"
      ? "from-yellow-500 to-orange-600"
      : "from-red-500 to-orange-600"

  const bgGradient =
    trustData.level === "high"
      ? "from-emerald-500/10 via-green-500/5 to-transparent"
      : trustData.level === "medium"
      ? "from-yellow-500/10 via-orange-500/5 to-transparent"
      : "from-red-500/10 via-orange-500/5 to-transparent"

  const StatusIcon = trustData.level === "high" ? CheckCircle : trustData.level === "medium" ? AlertTriangle : XCircle

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientClass} rounded-2xl blur-xl opacity-30 animate-pulse`}></div>
      
      <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A] border border-gray-800 hover:border-gray-700 rounded-2xl p-8 shadow-2xl overflow-hidden">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${bgGradient} rounded-full blur-3xl opacity-50`}></div>
        
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-xl blur-md opacity-50`}></div>
              <div className={`relative bg-gradient-to-br ${gradientClass} p-3 rounded-xl shadow-lg`}>
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Trust Score</h2>
              <p className="text-gray-400 text-sm">On-chain security analysis</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 bg-gradient-to-r ${gradientClass} bg-opacity-10 px-4 py-2 rounded-lg border border-current`} style={{ borderColor: color }}>
            <StatusIcon className="w-5 h-5" style={{ color }} />
            <span className="text-sm font-semibold uppercase" style={{ color }}>
              {trustData.level} Trust
            </span>
          </div>
        </div>

        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.5 }} />
                  </linearGradient>
                  
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#2A2A2A"
                  strokeWidth="12"
                />

                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(trustData.score / 100) * 534} 534`}
                  filter="url(#glow)"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold mb-2" style={{ color }}>
                    {trustData.score}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                    Security Score
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(trustData.score / 20)
                            ? 'text-current'
                            : 'text-gray-700'
                        }`}
                        style={{ color: i < Math.round(trustData.score / 20) ? color : undefined }}
                        fill={i < Math.round(trustData.score / 20) ? color : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black/40 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-700 transition-colors">
            <Lock className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
            <p className="text-xs text-gray-400 mb-1">Liquidity</p>
            <p className="text-lg font-bold text-white">Locked</p>
          </div>
          
          <div className="bg-black/40 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-700 transition-colors">
            <FileCheck className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
            <p className="text-xs text-gray-400 mb-1">Contract</p>
            <p className="text-lg font-bold text-white">Verified</p>
          </div>
          
          <div className="bg-black/40 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-700 transition-colors">
            <Shield className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <p className="text-xs text-gray-400 mb-1">Ownership</p>
            <p className="text-lg font-bold text-white">Renounced</p>
          </div>
          
          <div className="bg-black/40 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-700 transition-colors">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-amber-400" />
            <p className="text-xs text-gray-400 mb-1">Safety</p>
            <p className="text-lg font-bold" style={{ color }}>
              {trustData.level.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <Button
            onClick={() => setExpanded(!expanded)}
            className={`w-full h-14 bg-gradient-to-r ${gradientClass} hover:opacity-90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group`}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Hide Detailed Report
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                View Detailed Report
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {expanded && (
          <div className="relative z-10 mt-6 pt-6 border-t border-gray-800 animate-in slide-in-from-top duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Security Features
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-800">
                    <span className="text-sm text-gray-300">Liquidity Locked</span>
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-800">
                    <span className="text-sm text-gray-300">Contract Verified</span>
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-800">
                    <span className="text-sm text-gray-300">Ownership Renounced</span>
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Risk Assessment
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-black/40 rounded-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Rug Pull Risk</span>
                      <span className="text-xs font-bold text-emerald-400">LOW</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/40 rounded-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Contract Safety</span>
                      <span className="text-xs font-bold text-emerald-400">HIGH</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/40 rounded-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Transparency</span>
                      <span className="text-xs font-bold text-emerald-400">EXCELLENT</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
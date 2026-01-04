"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import { SAFEMINT_FACTORY_ADDRESS, SAFEMINT_FACTORY_ABI } from "@/lib/contracts"

type TokenData = {
  token: string
  creator: string
  score: number
  liquidityLock: string
  lockExpiry: bigint
  liquidityAdded: boolean
}

export function TokenExplorer() {
  const [tokens, setTokens] = useState<TokenData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const factory = new ethers.Contract(
        SAFEMINT_FACTORY_ADDRESS,
        SAFEMINT_FACTORY_ABI,
        provider
      )

      const addresses: string[] = await factory.getAllTokens()

      const results: TokenData[] = await Promise.all(
        addresses.map(async (addr) => {
          const info = await factory.tokenInfo(addr)
          return {
            token: info.token,
            creator: info.creator,
            score: Number(info.score),
            liquidityLock: info.liquidityLock,
            lockExpiry: info.lockExpiry,
            liquidityAdded: info.liquidityAdded
          }
        })
      )

      setTokens(results)
    } catch (err) {
      console.error("Explorer error:", err)
    } finally {
      setLoading(false)
    }
  }

  const scoreLabel = (score: number) =>
    score === 2 ? "VERIFIED" : score === 1 ? "CAUTION" : "HIGH RISK"

  const scoreConfig = {
    2: {
      label: "VERIFIED",
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      bgGradient: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-emerald-500/20",
      dotColor: "bg-emerald-400",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    1: {
      label: "CAUTION",
      gradient: "from-amber-400 via-yellow-400 to-orange-400",
      bgGradient: "from-amber-500/10 via-yellow-500/5 to-orange-500/10",
      borderColor: "border-amber-500/30",
      glowColor: "shadow-amber-500/20",
      dotColor: "bg-amber-400",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    0: {
      label: "HIGH RISK",
      gradient: "from-rose-400 via-red-400 to-pink-400",
      bgGradient: "from-rose-500/10 via-red-500/5 to-pink-500/10",
      borderColor: "border-rose-500/30",
      glowColor: "shadow-rose-500/20",
      dotColor: "bg-rose-400",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  }

  return (
    <div className="relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping opacity-20" style={{animationDuration: '3s'}} />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-20" style={{animationDuration: '4s', animationDelay: '1s'}} />
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-20" style={{animationDuration: '5s', animationDelay: '2s'}} />
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-br from-black via-[#0A0A0A] to-black border border-[#D4AF37]/20 shadow-2xl">
        {/* Multiple ambient glow layers */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '5s', animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}} />
        
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent opacity-50 animate-pulse" style={{animationDuration: '3s'}} />
        
        <div className="relative z-10 p-8">
          {/* Premium Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent">
            <div className="flex items-center gap-4">
              <div className="relative">
                {/* Rotating ring effect */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '3s'}}>
                  <div className="w-12 h-12 border-2 border-transparent border-t-[#D4AF37] rounded-full" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '4s', animationDirection: 'reverse'}}>
                  <div className="w-12 h-12 border-2 border-transparent border-b-blue-400/50 rounded-full" />
                </div>
                
                {/* Icon container */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 backdrop-blur-sm">
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#FFD700] bg-clip-text text-transparent tracking-tight mb-1">
                  Token Explorer
                </h2>
                <p className="text-sm text-gray-400 font-medium">Discover verified tokens and track liquidity</p>
              </div>
            </div>

            {/* Stats badge */}
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-white">{tokens.length}</span>
              </div>
              <span className="text-xs text-gray-400 uppercase tracking-wider">Active Tokens</span>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative mb-6">
                {/* Triple ring loader */}
                <div className="w-24 h-24 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
                <div className="absolute inset-2 border-4 border-transparent border-t-blue-500/50 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}} />
                <div className="absolute inset-4 border-4 border-transparent border-t-purple-500/30 rounded-full animate-spin" style={{animationDuration: '2s'}} />
                
                {/* Center pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#D4AF37] rounded-full animate-ping" />
                  <div className="absolute w-4 h-4 bg-[#D4AF37] rounded-full" />
                </div>
              </div>
              <p className="text-gray-400 font-medium animate-pulse">Discovering tokens...</p>
            </div>
          )}

          {!loading && tokens.length === 0 && (
            <div className="text-center py-24 px-4">
              <div className="relative inline-block mb-6">
                {/* Rotating gradient ring */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '3s'}}>
                  <div className="w-28 h-28 border-4 border-transparent border-t-[#D4AF37] rounded-full" />
                </div>
                
                {/* Icon container */}
                <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[#D4AF37]/10 via-[#D4AF37]/5 to-blue-500/10 border border-[#D4AF37]/20 backdrop-blur-sm">
                  <svg className="w-14 h-14 text-[#D4AF37]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-xl font-semibold mb-2">No tokens discovered yet</p>
              <p className="text-gray-500 text-sm">Be the first to launch a token on SafeMint</p>
            </div>
          )}

          <div className="space-y-4">
            {tokens.map((t, i) => {
              const config = scoreConfig[t.score as keyof typeof scoreConfig]
              
              return (
                <div
                  key={i}
                  className={`group relative overflow-hidden border ${config.borderColor} rounded-2xl bg-gradient-to-br from-[#0D0D0D] via-black to-[#0A0A0A] hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-2xl ${config.glowColor} hover:scale-[1.01]`}
                  style={{
                    animation: `slideIn 0.5s ease-out ${i * 0.1}s both`
                  }}
                >
                  {/* Animated gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  
                  {/* Scanning line effect */}
                  <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" />
                  </div>
                  
                  <div className="relative z-10 p-6">
                    {/* Token Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#D4AF37] to-transparent" />
                          <p className="text-xs font-bold text-[#D4AF37]/70 uppercase tracking-widest">Token Address</p>
                        </div>
                        <div className="group/address relative">
                          <p className="font-mono text-base text-gray-300 truncate group-hover/address:text-[#D4AF37] transition-colors duration-300">
                            {t.token}
                          </p>
                          {/* Copy hint */}
                          <div className="absolute right-0 top-0 opacity-0 group-hover/address:opacity-100 transition-opacity duration-300">
                            <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Trust Score Badge */}
                      <div className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} backdrop-blur-sm shadow-lg ${config.glowColor}`}>
                        <div className="relative">
                          <div className={`w-2.5 h-2.5 rounded-full ${config.dotColor} animate-pulse`} />
                          <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${config.dotColor} animate-ping`} />
                        </div>
                        <div className={`text-transparent bg-gradient-to-r ${config.gradient} bg-clip-text`}>
                          {config.icon}
                        </div>
                        <span className={`text-xs font-black uppercase tracking-wider bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                          {scoreLabel(t.score)}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                    {/* Token Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Creator */}
                      <div className="group/creator relative p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4 text-[#D4AF37]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-xs font-bold text-[#D4AF37]/70 uppercase tracking-wider">Creator</p>
                        </div>
                        <p className="font-mono text-sm text-gray-400 truncate group-hover/creator:text-gray-300 transition-colors">
                          {t.creator}
                        </p>
                      </div>
                      
                      {/* Liquidity Status */}
                      <div className={`relative p-4 rounded-xl ${t.liquidityAdded ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20' : 'bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20'} transition-all duration-300`}>
                        <div className="flex items-center gap-2 mb-2">
                          <svg className={`w-4 h-4 ${t.liquidityAdded ? 'text-emerald-400' : 'text-rose-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={t.liquidityAdded ? "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" : "M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"} />
                          </svg>
                          <p className={`text-xs font-bold uppercase tracking-wider ${t.liquidityAdded ? 'text-emerald-400' : 'text-rose-400'}`}>
                            Liquidity Status
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`relative w-3 h-3 rounded-full ${t.liquidityAdded ? 'bg-emerald-400' : 'bg-rose-400'} ${t.liquidityAdded ? 'animate-pulse' : ''}`}>
                            {t.liquidityAdded && <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />}
                          </div>
                          <span className={`text-sm font-bold ${t.liquidityAdded ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {t.liquidityAdded ? 'Secured & Locked' : 'Not Secured'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animated bottom border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:h-1`} />
                  
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-full" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
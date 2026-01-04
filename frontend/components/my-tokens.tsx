"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/context/WalletContext"
import { Coins, Lock, CheckCircle, Loader2, Sparkles, ExternalLink, Copy, Shield, TrendingUp, AlertCircle } from "lucide-react"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
  readProvider,
} from "@/lib/contracts"

type MyToken = {
  token: string
  liquidityAdded: boolean
}

export function MyTokens({
  onSelect,
}: {
  onSelect: (t: string) => void
}) {
  const { address, signer } = useWallet()
  const [tokens, setTokens] = useState<MyToken[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!address) return

    const load = async () => {
      try {
        const factory = new ethers.Contract(
          SAFEMINT_FACTORY_ADDRESS,
          SAFEMINT_FACTORY_ABI,
          readProvider
        )

        const allTokens = await factory.getAllTokens()
        const mine = []

        for (const t of allTokens) {
          const info = await factory.tokenInfo(t)
          if (info.creator.toLowerCase() === address.toLowerCase()) {
            mine.push({ token: t, liquidityAdded: info.liquidityAdded })
          }
        }

        setTokens(mine)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [address])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Ambient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 animate-pulse-glow"></div>
      
      <Card className="relative bg-gradient-to-br from-[#1A1A1A]/95 via-[#1F1F1F]/95 to-[#1A1A1A]/95 border-2 border-[#D4AF37]/40 rounded-3xl p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/10 via-amber-500/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-amber-600 rounded-xl blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-br from-[#D4AF37] to-amber-600 p-3 rounded-xl shadow-lg">
                <Coins className="w-7 h-7 text-black" />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] bg-clip-text text-transparent drop-shadow-lg">
                My Tokens
              </h3>
              <p className="text-gray-400 text-sm mt-1">Your created token portfolio</p>
            </div>
          </div>

          {/* Token Count Badge */}
          {!loading && tokens.length > 0 && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/20 border border-[#D4AF37]/40 px-4 py-2 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm font-bold text-[#D4AF37]">{tokens.length} Token{tokens.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37] rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-[#D4AF37]/20 to-amber-500/20 p-6 rounded-full border border-[#D4AF37]/40">
                  <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-300 mb-2">Loading your tokens</p>
                <p className="text-sm text-gray-500">Fetching data from blockchain...</p>
              </div>
            </div>
          ) : tokens.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gray-500 rounded-full blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-full border border-gray-700/50">
                  <AlertCircle className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <div className="text-center max-w-md">
                <p className="text-xl font-semibold text-gray-300 mb-2">No tokens created yet</p>
                <p className="text-sm text-gray-500">Start creating secure and transparent tokens to see them here.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {tokens.map((t, index) => (
                <div
                  key={t.token}
                  className="group relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/30 to-cyan-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  
                  {/* Token Card */}
                  <div 
                    onClick={() => onSelect(t.token)}
                    className="relative bg-gradient-to-br from-black/60 to-[#0F0F0F]/60 border border-gray-800 hover:border-[#D4AF37]/60 rounded-2xl p-6 cursor-pointer transition-all duration-500 group-hover:scale-[1.02] backdrop-blur-sm shadow-lg group-hover:shadow-2xl group-hover:shadow-[#D4AF37]/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left Side - Token Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative">
                            <div className="absolute inset-0 bg-[#D4AF37] rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-[#D4AF37] to-amber-600 p-2 rounded-lg">
                              <Shield className="w-5 h-5 text-black" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Contract Address</p>
                            <p className="text-sm font-mono text-gray-300 break-all group-hover:text-[#D4AF37] transition-colors">
                              {t.token}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 mt-3">
                          {t.liquidityAdded ? (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-green-600/20 border border-emerald-500/40 px-3 py-1.5 rounded-lg">
                              <Lock className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Liquidity Locked</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/40 px-3 py-1.5 rounded-lg">
                              <AlertCircle className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Pending Liquidity</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Actions */}
                      <div className="flex flex-col items-end gap-2">
                        <button 
                          className="flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-amber-300 transition-colors group-hover:translate-x-1 duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelect(t.token)
                          }}
                        >
                          View Details
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        <button 
                          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigator.clipboard.writeText(t.token)
                          }}
                        >
                          <Copy className="w-3 h-3" />
                          Copy Address
                        </button>
                      </div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-2xl"></div>
                    
                    {/* Corner Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        {!loading && tokens.length > 0 && (
          <div className="relative z-10 mt-8 pt-6 border-t border-gray-800/50">
            <div className="flex items-start gap-3 text-xs text-gray-500">
              <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <p>
                Click on any token to view details, manage liquidity, or check trust scores. All tokens are secured on the QIE blockchain.
              </p>
            </div>
          </div>
        )}
      </Card>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
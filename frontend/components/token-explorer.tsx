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
    score === 2 ? "GREEN" : score === 1 ? "YELLOW" : "RED"

  return (
    <Card className="bg-[#1A1A1A] border-[#D4AF37]/30 p-6">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
        Token Explorer
      </h2>

      {loading && <p className="text-gray-400">Loading tokens…</p>}

      {!loading && tokens.length === 0 && (
        <p className="text-gray-400">No tokens created yet</p>
      )}

      <div className="space-y-4">
        {tokens.map((t, i) => (
          <div
            key={i}
            className="border border-gray-700 rounded-lg p-4 bg-black/40"
          >
            <p><span className="text-gray-400">Token:</span> {t.token}</p>
            <p><span className="text-gray-400">Creator:</span> {t.creator}</p>
            <p>
              <span className="text-gray-400">Trust:</span>{" "}
              <span
                className={
                  t.score === 2
                    ? "text-green-400"
                    : t.score === 1
                    ? "text-yellow-400"
                    : "text-red-500"
                }
              >
                {scoreLabel(t.score)}
              </span>
            </p>
            <p>
              <span className="text-gray-400">Liquidity:</span>{" "}
              {t.liquidityAdded ? "Locked ✅" : "Not Added ❌"}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

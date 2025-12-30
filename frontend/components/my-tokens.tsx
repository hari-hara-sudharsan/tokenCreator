"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWallet } from "@/context/WalletContext"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"

type MyToken = {
  token: string
  liquidityAdded: boolean
}

export function MyTokens() {
  const { address, provider, signer } = useWallet()
  const [tokens, setTokens] = useState<MyToken[]>([])
  const [ethAmount, setEthAmount] = useState<Record<string, string>>({})
  const [tokenAmount, setTokenAmount] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!address || !provider) return

    const load = async () => {
      const factory = new ethers.Contract(
        SAFEMINT_FACTORY_ADDRESS,
        SAFEMINT_FACTORY_ABI,
        provider
      )

      const allTokens: string[] = await factory.getAllTokens()
      const mine: MyToken[] = []

      for (const t of allTokens) {
        const info = await factory.tokenInfo(t)
        if (info.creator.toLowerCase() === address.toLowerCase()) {
          mine.push({
            token: t,
            liquidityAdded: info.liquidityAdded,
          })
        }
      }

      setTokens(mine)
      setLoading(false)
    }

    load()
  }, [address, provider])

  const addLiquidity = async (token: string) => {
    if (!signer) {
      alert("Connect wallet")
      return
    }

    try {
      const factory = new ethers.Contract(
        SAFEMINT_FACTORY_ADDRESS,
        SAFEMINT_FACTORY_ABI,
        signer
      )

      const eth = ethAmount[token]
      const tokens = tokenAmount[token]

      if (!eth || !tokens) {
        alert("Enter ETH and Token amount")
        return
      }

      const tx = await factory.addLiquidityAndLock(
        token,
        BigInt(tokens),
        {
          value: ethers.parseEther(eth),
        }
      )

      alert("Liquidity transaction sent")
      await tx.wait()
      alert("Liquidity locked successfully")

      window.location.reload()
    } catch (err) {
      console.error("LIQUIDITY ERROR:", err)
      alert("Liquidity failed — check console")
    }
  }

  return (
    <Card className="bg-[#1A1A1A] border border-[#D4AF37]/30 p-6">
      <h3 className="text-xl font-bold text-[#D4AF37] mb-4">
        My Tokens
      </h3>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : tokens.length === 0 ? (
        <p className="text-gray-400">No tokens created yet.</p>
      ) : (
        <div className="space-y-6">
          {tokens.map((t) => (
            <div
              key={t.token}
              className="bg-black/50 border border-gray-700 rounded-lg p-4"
            >
              <p className="font-mono text-sm break-all mb-3">
                {t.token}
              </p>

              {t.liquidityAdded ? (
                <p className="text-green-400 text-sm">
                  ✅ Liquidity Added & Locked
                </p>
              ) : (
                <>
                  <Input
                    placeholder="Token Amount"
                    className="mb-2 bg-black text-white"
                    onChange={(e) =>
                      setTokenAmount({
                        ...tokenAmount,
                        [t.token]: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="ETH Amount"
                    className="mb-3 bg-black text-white"
                    onChange={(e) =>
                      setEthAmount({
                        ...ethAmount,
                        [t.token]: e.target.value,
                      })
                    }
                  />
                  <Button
                    onClick={() => addLiquidity(t.token)}
                    className="w-full bg-gradient-to-r from-[#00BFFF] to-[#32CD32] text-black"
                  >
                    Add Liquidity & Lock
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Droplet, Lock, ArrowDown, Waves, Shield, AlertCircle } from "lucide-react"
import { useWallet } from "@/context/WalletContext"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"

export function AddLiquiditySection({
  tokenAddress,
}: {
  tokenAddress?: string | null
}) {
  const { signer } = useWallet()
  const [tokenAmount, setTokenAmount] = useState("")
  const [ethAmount, setEthAmount] = useState("")

  if (!tokenAddress) {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-10"></div>
        
        <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A] border border-cyan-500/20 rounded-2xl p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-full border border-cyan-500/30">
                <Droplet className="w-12 h-12 text-cyan-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-300">No Token Selected</h3>
              <p className="text-gray-500 max-w-md">
                Please select or create a token first to add liquidity and secure your pool
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-cyan-400/70 bg-cyan-500/5 px-4 py-2 rounded-lg border border-cyan-500/20">
              <AlertCircle className="w-4 h-4" />
              <span>Select a token to continue</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  const addLiquidity = async () => {
    if (!signer) return alert("Connect wallet")

    const factory = new ethers.Contract(
      SAFEMINT_FACTORY_ADDRESS,
      SAFEMINT_FACTORY_ABI,
      signer
    )

    const tx = await factory.addLiquidityAndLock(
      tokenAddress,
      BigInt(tokenAmount),
      { value: ethers.parseEther(ethAmount) }
    )

    await tx.wait()
    alert("Liquidity locked")
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Ambient glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
      
      <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A] border border-cyan-500/40 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
                <Droplet className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Add Liquidity
              </h2>
              <p className="text-gray-400 text-sm mt-1">Provide liquidity and lock your pool</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/30">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400 font-medium">Secured</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Lock className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-300 font-medium mb-1">Liquidity Protection</p>
            <p className="text-xs text-gray-400">Your liquidity will be automatically locked to ensure pool security and prevent rug pulls.</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          {/* Token Amount Input */}
          <div className="bg-black/40 border border-gray-700 rounded-xl p-5 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400 font-medium">Token Amount</span>
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-gray-500">Balance: --</span>
              </div>
            </div>
            <Input
              placeholder="0.00"
              className="bg-transparent border-none text-white text-2xl font-semibold h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-600"
              onChange={(e) => setTokenAmount(e.target.value)}
              value={tokenAmount}
            />
          </div>

          {/* Arrow Separator */}
          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-[#1A1A1A] border border-cyan-500/30 rounded-full p-2 shadow-lg">
              <ArrowDown className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          {/* ETH Amount Input */}
          <div className="bg-black/40 border border-gray-700 rounded-xl p-5 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400 font-medium">ETH Amount</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-blue-500"></div>
                <span className="text-xs text-gray-500">Balance: --</span>
              </div>
            </div>
            <Input
              placeholder="0.00"
              className="bg-transparent border-none text-white text-2xl font-semibold h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-600"
              onChange={(e) => setEthAmount(e.target.value)}
              value={ethAmount}
            />
          </div>
        </div>

        {/* Liquidity Info Cards */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Pool Share</p>
            <p className="text-lg font-semibold text-cyan-400">--</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">LP Tokens</p>
            <p className="text-lg font-semibold text-cyan-400">--</p>
          </div>
        </div>

        {/* Add Liquidity Button */}
        <Button
          onClick={addLiquidity}
          disabled={!tokenAmount || !ethAmount}
          className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-cyan-500/20"
        >
          <Lock className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Add Liquidity & Lock
        </Button>

        {/* Footer Note */}
        <div className="mt-6 flex items-start gap-2 text-xs text-gray-500">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400/50" />
          <p>
            By adding liquidity, you agree to lock your LP tokens. Review all details before confirming the transaction.
          </p>
        </div>
      </Card>
    </div>
  )
}
"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Eye, ArrowRight, Sparkles, Lock, TrendingUp } from "lucide-react"
import { useWallet } from "@/context/WalletContext"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"

interface TokenFormData {
  name: string
  symbol: string
  supply: string
  lockMonths: number
}

export function CreateTokenForm({
  onDeployed,
}: {
  onDeployed: (token: string) => void
}) {
  const [step, setStep] = useState(1)
  const [previewData, setPreviewData] = useState<TokenFormData | null>(null)
  const [deploying, setDeploying] = useState(false)

  const { signer } = useWallet()

  const { register, handleSubmit, watch } = useForm<TokenFormData>({
    defaultValues: { lockMonths: 12 },
  })

  const formData = watch()

  const onSubmit = (data: TokenFormData) => {
    setPreviewData(data)
    setStep(3)
  }

  const deployToken = async () => {
    if (!signer || !previewData) return alert("Connect wallet")

    try {
      setDeploying(true)

      const factory = new ethers.Contract(
        SAFEMINT_FACTORY_ADDRESS,
        SAFEMINT_FACTORY_ABI,
        signer
      )

      const tx = await factory.createToken(
        previewData.name,
        previewData.symbol,
        BigInt(previewData.supply),
        BigInt(previewData.lockMonths)
      )

      const receipt = await tx.wait()

      for (const log of receipt.logs) {
        try {
          const parsed = factory.interface.parseLog(log)
          if (parsed.name === "TokenCreated") {
            onDeployed(parsed.args.token)
          }
        } catch {}
      }

      alert("🎉 Token deployed successfully!")
    } catch (e: any) {
      console.error("DEPLOY ERROR:", e)
      alert("Deployment failed")
    } finally {
      setDeploying(false)
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Ambient glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-[#D4AF37] rounded-2xl blur-xl opacity-20 animate-pulse"></div>
      
      <Card className="relative bg-gradient-to-br from-[#1A1A1A] via-[#1F1F1F] to-[#1A1A1A] border border-[#D4AF37]/40 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-br from-[#D4AF37] to-amber-600 p-3 rounded-xl">
                <Coins className="w-7 h-7 text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] bg-clip-text text-transparent">
                Create Token
              </h2>
              <p className="text-gray-400 text-sm mt-1">Deploy your custom ERC-20 token</p>
            </div>
          </div>
          
          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-8 bg-gradient-to-r from-[#D4AF37] to-amber-500"
                    : s < step
                    ? "w-2 bg-[#D4AF37]"
                    : "w-2 bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Token Name
              </Label>
              <Input
                {...register("name")}
                placeholder="e.g., Golden Coin"
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                Symbol
              </Label>
              <Input
                {...register("symbol")}
                placeholder="e.g., GLD"
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 transition-all uppercase"
              />
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.symbol}
              className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#E5C158] hover:to-amber-500 text-black font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8 group"
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* Step 2: Supply & Lock */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#D4AF37]" />
                Total Supply
              </Label>
              <Input
                type="number"
                {...register("supply")}
                placeholder="e.g., 1000000"
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 transition-all"
              />
              <p className="text-xs text-gray-500">The total number of tokens to mint</p>
            </div>

            <div className="space-y-4">
              <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D4AF37]" />
                Lock Period
              </Label>
              
              <div className="bg-black/40 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-white">{formData.lockMonths}</span>
                  <span className="text-sm text-gray-400">months</span>
                </div>
                
                <input
                  type="range"
                  min={6}
                  max={12}
                  step={6}
                  {...register("lockMonths")}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  style={{
                    background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((formData.lockMonths - 6) / 6) * 100}%, #374151 ${((formData.lockMonths - 6) / 6) * 100}%, #374151 100%)`
                  }}
                />
                
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>6 months</span>
                  <span>12 months</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                className="flex-1 h-12 bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#E5C158] hover:to-amber-500 text-black font-semibold rounded-xl transition-all duration-300 group"
              >
                <Eye className="mr-2 h-5 w-5" />
                Preview
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview & Deploy */}
        {step === 3 && previewData && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-amber-500/5 border border-[#D4AF37]/30 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-4">Token Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Name</p>
                  <p className="text-white font-semibold text-lg">{previewData.name}</p>
                </div>
                
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Symbol</p>
                  <p className="text-white font-semibold text-lg">{previewData.symbol}</p>
                </div>
                
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Total Supply</p>
                  <p className="text-white font-semibold text-lg">{Number(previewData.supply).toLocaleString()}</p>
                </div>
                
                <div className="bg-black/40 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Lock Period</p>
                  <p className="text-white font-semibold text-lg">{previewData.lockMonths} months</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 rounded-xl"
                disabled={deploying}
              >
                Back
              </Button>
              <Button
                onClick={deployToken}
                disabled={deploying}
                className="flex-1 h-12 bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#E5C158] hover:to-amber-500 text-black font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 group"
              >
                {deploying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2"></div>
                    Deploying...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Deploy Token
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
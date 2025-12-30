"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Eye } from "lucide-react"
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

export function CreateTokenForm() {
  const [step, setStep] = useState(1)
  const [previewData, setPreviewData] = useState<TokenFormData | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [tokenAddress, setTokenAddress] = useState<string | null>(null)

  const { signer } = useWallet()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TokenFormData>({
    defaultValues: { lockMonths: 12 },
  })

  const formData = watch()

  const formatNumber = (num: string) =>
    num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  /* ---------------- PREVIEW ---------------- */

  const onSubmit = async (data: TokenFormData) => {
    setPreviewData(data)
    setStep(3)
  }

  /* ---------------- DEPLOY ---------------- */

  const deployToken = async () => {
    if (!signer || !previewData) {
      alert("Connect wallet first")
      return
    }

    // Must match Solidity rules
    if (previewData.lockMonths !== 6 && previewData.lockMonths !== 12) {
      alert("Lock period must be 6 or 12 months")
      return
    }

    if (Number(previewData.supply) <= 0) {
      alert("Supply must be greater than 0")
      return
    }

    try {
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

      setTxHash(tx.hash)
      alert("Transaction sent!")

      const receipt = await tx.wait()

      // 🔥 Extract TokenCreated event
      for (const log of receipt.logs) {
        try {
          const parsed = factory.interface.parseLog(log)
          if (parsed.name === "TokenCreated") {
            setTokenAddress(parsed.args.token)
            console.log("✅ Token deployed:", parsed.args.token)
          }
        } catch {
          // Ignore unrelated logs
        }
      }

      alert("🎉 Token deployed successfully!")
    } catch (err: any) {
      console.error("DEPLOY ERROR:", err)
      alert(err.reason || err.message || "Deployment failed")
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <Card id="create" className="bg-[#1A1A1A] border-[#D4AF37]/30 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Coins className="w-8 h-8 text-[#D4AF37]" />
        <h2 className="text-2xl font-bold text-white">Create Token</h2>
      </div>

      <div className="mb-8 flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${
              s <= step
                ? "bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label>Token Name</Label>
            <Input
              {...register("name", { required: true })}
              placeholder="My Token"
              className="bg-black text-white"
            />
          </div>

          <div>
            <Label>Symbol</Label>
            <Input
              {...register("symbol", { required: true })}
              placeholder="MTK"
              className="bg-black text-white uppercase"
            />
          </div>

          <Button
            onClick={() => setStep(2)}
            disabled={!formData.name || !formData.symbol}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black"
          >
            Next
          </Button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <Label>Total Supply</Label>
            <Input
              type="number"
              {...register("supply", { required: true })}
              className="bg-black text-white"
            />
            {formData.supply && (
              <p className="text-blue-400">
                {formatNumber(formData.supply)}
              </p>
            )}
          </div>

          <div>
            <Label>Lock Months: {formData.lockMonths}</Label>
            <input
              type="range"
              min={6}
              max={12}
              step={6}
              {...register("lockMonths")}
              className="w-full accent-[#D4AF37]"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && previewData && (
        <div className="space-y-6">
          <div className="bg-black/50 p-4 rounded-lg">
            <p>Name: {previewData.name}</p>
            <p>Symbol: {previewData.symbol}</p>
            <p>Supply: {formatNumber(previewData.supply)}</p>
            <p>Lock: {previewData.lockMonths} months</p>
          </div>

          <Button
            onClick={deployToken}
            className="w-full bg-gradient-to-r from-[#32CD32] to-[#00BFFF] text-black"
          >
            Deploy Token
          </Button>

          {txHash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              className="text-green-400 underline text-sm"
            >
              View Transaction
            </a>
          )}

          {tokenAddress && (
            <p className="text-blue-400 text-sm break-all">
              Token Address: {tokenAddress}
            </p>
          )}
        </div>
      )}
    </Card>
  )
}

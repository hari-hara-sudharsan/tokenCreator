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

  const { register, handleSubmit, watch } = useForm<TokenFormData>({
    defaultValues: { lockMonths: 12 },
  })

  const formData = watch()

  const onSubmit = (data: TokenFormData) => {
    setPreviewData(data)
    setStep(3)
  }

  const deployToken = async () => {
    if (!signer || !previewData) {
      alert("Connect wallet first")
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

      const receipt = await tx.wait()

      for (const log of receipt.logs) {
        try {
          const parsed = factory.interface.parseLog(log)
          if (parsed.name === "TokenCreated") {
            setTokenAddress(parsed.args.token)
          }
        } catch {}
      }

      alert("🎉 Token deployed successfully!")
    } catch (e: any) {
      console.error("DEPLOY ERROR:", e)
      alert("Deployment failed — check MetaMask + console")
    }
  }

  return (
    <Card className="bg-[#1A1A1A] border-[#D4AF37]/30 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Create Token</h2>

      {step === 1 && (
        <>
          <Label>Token Name</Label>
          <Input {...register("name")} className="bg-black text-white mb-4" />
          <Label>Symbol</Label>
          <Input {...register("symbol")} className="bg-black text-white mb-4" />
          <Button onClick={() => setStep(2)}>Next</Button>
        </>
      )}

      {step === 2 && (
        <>
          <Label>Total Supply</Label>
          <Input
            type="number"
            {...register("supply")}
            className="bg-black text-white mb-4"
          />
          <Label>Lock Months</Label>
          <input
            type="range"
            min={6}
            max={12}
            step={6}
            {...register("lockMonths")}
            className="w-full"
          />
          <Button onClick={handleSubmit(onSubmit)}>Preview</Button>
        </>
      )}

      {step === 3 && previewData && (
        <>
          <p>Name: {previewData.name}</p>
          <p>Symbol: {previewData.symbol}</p>
          <p>Supply: {previewData.supply}</p>
          <Button onClick={deployToken}>Deploy Token</Button>
          {tokenAddress && <p>Token: {tokenAddress}</p>}
        </>
      )}
    </Card>
  )
}
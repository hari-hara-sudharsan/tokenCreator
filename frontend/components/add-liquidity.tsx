"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Droplet, Loader2, Info } from "lucide-react"
import { useWallet } from "@/context/WalletContext"
import {
  SAFEMINT_FACTORY_ADDRESS,
  SAFEMINT_FACTORY_ABI,
} from "@/lib/contracts"
import { useSearchParams } from "next/navigation"





export function AddLiquiditySection() {
  const { signer } = useWallet()

  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [ethAmount, setEthAmount] = useState("")
  const [slippage, setSlippage] = useState(0.5)
  const { address } = useWallet()


  const [isSimulating, setIsSimulating] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [simulationResult, setSimulationResult] =
    useState<{ lpTokens: string } | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const selectedTokenAddress = searchParams.get("token")

  if (!selectedTokenAddress) {
    return <p className="text-gray-400">Select a token first</p>
  }


  


  /* ---------------- REAL ADD LIQUIDITY ---------------- */

  const handleAddLiquidity = async () => {
    if (!signer) {
      alert("Connect wallet first")
      return
    }

    if (!tokenAddress || !tokenAmount || !ethAmount) {
      alert("All fields are required")
      return
    }

    try {
      setIsAdding(true)

      const factory = new ethers.Contract(
        SAFEMINT_FACTORY_ADDRESS,
        SAFEMINT_FACTORY_ABI,
        signer
      )

      const tx = await factory.addLiquidityAndLock(
        tokenAddress,
        BigInt(tokenAmount),
        {
          value: ethers.parseEther(ethAmount),
        }
      )

      setTxHash(tx.hash)
      alert("Liquidity transaction sent")

      await tx.wait()
      alert("🔒 Liquidity added & locked successfully!")
    } catch (err: any) {
      console.error("LIQUIDITY ERROR:", err)
      alert(err.reason || err.message || "Liquidity failed")
    } finally {
      setIsAdding(false)
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <Card className="bg-[#1A1A1A] border-[#00BFFF]/30 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Droplet className="w-8 h-8 text-[#00BFFF]" />
        <h2 className="text-2xl font-bold text-white">Add Liquidity</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-300 mb-2 block">
            Token Address
          </Label>
          <Input
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..."
            className="bg-black border-gray-700 text-white focus:border-[#00BFFF]"
          />
        </div>

        <div>
          <Label htmlFor="tokenAmount" className="text-gray-300 mb-2 block">
            Token Amount
          </Label>
          <Input
            id="tokenAmount"
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            placeholder="1000"
            className="bg-black border-gray-700 text-white focus:border-[#00BFFF]"
          />
        </div>

        <div>
          <Label htmlFor="ethAmount" className="text-gray-300 mb-2 block">
            ETH Amount
          </Label>
          <Input
            id="ethAmount"
            type="number"
            step="0.01"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            placeholder="0.5"
            className="bg-black border-gray-700 text-white focus:border-[#00BFFF]"
          />
        </div>

        <div>
          <Label className="text-gray-300 mb-2 block">
            Slippage Tolerance: {slippage}%
          </Label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={slippage}
            onChange={(e) => setSlippage(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00BFFF]"
          />
        </div>

        {simulationResult && (
          <div className="bg-black/50 border border-[#00BFFF]/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-[#00BFFF] mt-0.5" />
              <div>
                <p className="text-sm text-gray-400 mb-1">
                  Estimated LP Tokens:
                </p>
                <p className="text-2xl font-bold text-[#00BFFF]">
                  {simulationResult.lpTokens}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-4">
          <div className="flex gap-2">
            <Info className="w-5 h-5 text-[#FFD700]" />
            <p className="text-sm text-gray-300">
              Liquidity will be locked automatically via SafeMint.
            </p>
          </div>
        </div>

        <Button
          onClick={handleAddLiquidity}
          disabled={!tokenAmount || !ethAmount || isSimulating}
          className="w-full bg-gradient-to-r from-[#00BFFF] to-[#32CD32] text-black font-semibold"
        >
          {isSimulating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Simulating...
            </>
          ) : (
            "Simulate Add Liquidity"
          )}
        </Button>

        <Button
          onClick={handleAddLiquidity}
          disabled={isAdding}
          className="w-full bg-gradient-to-r from-[#32CD32] to-[#00BFFF] text-black font-semibold"
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Liquidity...
            </>
          ) : (
            "Add Liquidity & Lock"
          )}
        </Button>

        {txHash && (
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            className="text-blue-400 underline text-sm block"
          >
            View on Etherscan
          </a>
        )}
      </div>
    </Card>
  )
}

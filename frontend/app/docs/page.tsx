"use client"

import { Card } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">

        <h1 className="text-4xl font-bold text-[#D4AF37]">
          SafeMint Documentation
        </h1>

        {/* Intro */}
        <Card className="bg-[#1A1A1A] border-[#D4AF37]/30 p-6">
          <p className="text-gray-300 leading-relaxed">
            SafeMint is a secure token launch platform built on the
            <span className="text-[#00BFFF] font-semibold"> QIE Blockchain</span>.
            It enables transparent token creation, locked liquidity,
            and on-chain trust scoring to prevent rug pulls.
          </p>
        </Card>

        {/* QIE Blockchain */}
        <Card className="bg-[#1A1A1A] border-[#32CD32]/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold text-[#32CD32]">
            QIE Blockchain Overview
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>High-performance EVM-compatible blockchain</li>
            <li>Low gas fees & fast finality</li>
            <li>Developer-friendly smart contract support</li>
            <li>Designed for secure DeFi infrastructure</li>
          </ul>
        </Card>

        {/* Token Lifecycle */}
        <Card className="bg-[#1A1A1A] border-[#00BFFF]/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold text-[#00BFFF]">
            SafeMint Token Lifecycle
          </h2>
          <ol className="list-decimal list-inside text-gray-400 space-y-2">
            <li>Create Token via SafeMint Factory</li>
            <li>Liquidity Lock Contract Generated</li>
            <li>Liquidity Added to Pool</li>
            <li>Trust Score Calculated On-Chain</li>
            <li>Community Promotion via Explorer</li>
          </ol>
        </Card>

        {/* Trust Score */}
        <Card className="bg-[#1A1A1A] border-[#FFD700]/30 p-6 space-y-3">
          <h2 className="text-2xl font-bold text-[#FFD700]">
            Trust Score System
          </h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Token created via SafeMint</li>
            <li>Creator identity linked</li>
            <li>Liquidity lock verified</li>
            <li>Lock expiry validation</li>
            <li>Liquidity added confirmation</li>
          </ul>
        </Card>

        {/* Explorer */}
        <Card className="bg-[#1A1A1A] border-[#D4AF37]/30 p-6">
          <p className="text-gray-400">
            Use the <span className="text-[#D4AF37] font-semibold">Explorer</span>
            to discover new tokens, analyze trust scores, and evaluate
            liquidity safety before investing.
          </p>
        </Card>

        {/* QIE Blockchain Documentation */}
        <Card className="bg-[#1A1A1A] border-[#D4AF37]/30 p-6">
            <p className="text-gray-400">
                For more information about the QIE Blockchain, please refer to the  
                <a
                    href="https://docs.qie.network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D4AF37] underline"
                >
                    QIE Blockchain Official Documentation
                </a>
            </p>
        </Card>


      </div>
    </div>
  )
}


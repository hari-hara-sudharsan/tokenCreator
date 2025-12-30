"use client"

import { useState } from "react"
import { Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/context/WalletContext"



export function Header() {
  const { address, connectWallet } = useWallet()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

console.log("HEADER WALLET ADDRESS:", address)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              SafeMint
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Features
            </a>
            <a href="#create" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Create Token
            </a>
            <a href="#trust" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Trust Score
            </a>
            
            <a href="/docs" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                Docs
            </a>

            <a
              href="/explorer"
              className="text-gray-300 hover:text-[#D4AF37]"
            >
              Explorer
            </a>

            
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#D4AF37] hover:to-[#00BFFF] text-black font-semibold transition-all duration-300"
            >
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
            </Button>
          </div>

          <button 
            className="md:hidden text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#D4AF37]/20">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <a href="#features" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Features
            </a>
            <a href="#create" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Create Token
            </a>
            <a href="#trust" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Trust Score
            </a>
            <a href="#docs" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Docs
            </a>
            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-semibold"
            >
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Connect Wallet"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

"use client"

import { useState } from "react"
import { Shield, Menu, X, Sparkles, BookOpen, Search, Wallet, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/context/WalletContext"

export function Header() {
  const { address, connectWallet } = useWallet()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  console.log("HEADER WALLET ADDRESS:", address)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-[#D4AF37]/20">
      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              
              {/* Icon Container */}
              <div className="relative bg-gradient-to-br from-[#D4AF37] to-amber-600 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#D4AF37]/30">
                <Shield className="w-7 h-7 text-black" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#FFD700] bg-clip-text text-transparent group-hover:from-[#FFD700] group-hover:to-[#D4AF37] transition-all duration-500">
                SafeMint
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">Secure Launches</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a 
              href="#features" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Features
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300"></div>
            </a>
            
            <a 
              href="#create" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Create Token</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300"></div>
            </a>
            
            <a 
              href="#trust" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10">Trust Score</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300"></div>
            </a>
            
            <a 
              href="/docs" 
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Docs
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300"></div>
            </a>

            <a
              href="/explorer"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Explorer
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300"></div>
            </a>
          </nav>

          {/* Desktop Wallet Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-medium">QIE Mainnet</span>
            </div>

            {/* Connect Wallet Button */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-[#FFD700] rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Button
                onClick={connectWallet}
                className="relative bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#E5C158] hover:to-amber-500 text-black font-semibold transition-all duration-300 px-6 h-11 rounded-xl shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 hover:scale-105 flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Connect Wallet"}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden relative p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] border-t border-[#D4AF37]/20 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col px-4 py-6 gap-2">
            {/* Status Badge */}
            <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-lg mb-4">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-400 font-medium">QIE Mainnet Live</span>
            </div>

            <a 
              href="#features" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Features</span>
            </a>
            
            <a 
              href="#create" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Create Token</span>
            </a>
            
            <a 
              href="#trust" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Shield className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Trust Score</span>
            </a>
            
            <a 
              href="/docs" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Docs</span>
            </a>

            <a 
              href="/explorer" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span>Explorer</span>
            </a>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-4"></div>

            {/* Mobile Wallet Button */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-[#FFD700] rounded-xl blur opacity-50"></div>
              <Button
                onClick={() => {
                  connectWallet()
                  setMobileMenuOpen(false)
                }}
                className="relative w-full bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#E5C158] hover:to-amber-500 text-black font-semibold h-12 rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Connect Wallet"}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
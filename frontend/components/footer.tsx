"use client"

import Link from "next/link"
import { Shield, Droplet, TrendingUp, FileText, MessageCircle, Twitter, Send, Github, ExternalLink, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-black border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-[120px] opacity-5 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-5 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500 rounded-full blur-[120px] opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative container mx-auto px-4 pt-20 pb-12">
        {/* Top Section with Logo and CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-br from-[#D4AF37] to-amber-600 p-2.5 rounded-xl">
                  <Shield className="w-7 h-7 text-black" />
                </div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] bg-clip-text text-transparent">
                SafeMint
              </h3>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              The trusted platform for secure and transparent token launches on the QIE blockchain. Build with confidence, launch with security.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">QIE Mainnet Live</span>
              </div>
              <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-lg">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">Trusted by 10K+</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-[#D4AF37]/30 rounded-2xl p-6 max-w-md w-full">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest updates on token launches and features.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-gray-600"
              />
              <button className="bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#E5C158] hover:to-amber-500 text-black font-semibold px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Product */}
          <div className="group">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37]/20 to-amber-600/20 rounded-lg flex items-center justify-center border border-[#D4AF37]/30">
                <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <h4 className="text-white font-semibold text-lg">Product</h4>
            </div>
            <ul className="space-y-3">
              <li>
                <Link href="/#create" className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-[#D4AF37] transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Create Token</span>
                </Link>
              </li>
              <li>
                <Link href="/#add-liquidity" className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-[#D4AF37] transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Lock Liquidity</span>
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-[#D4AF37] transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Trust Score</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-[#D4AF37] transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="group">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                <FileText className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-white font-semibold text-lg">Resources</h4>
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://docs.qie.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-cyan-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">QIE Official Docs</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.safemint.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-cyan-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">SafeMint Docs</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.safemint.app/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-cyan-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">API Reference</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 group/link">
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-cyan-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Support</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="group">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <MessageCircle className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold text-lg">Community</h4>
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://discord.gg/qie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-purple-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Discord</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/qienetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-purple-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/qienetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-purple-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/qie-network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-1 h-1 bg-gray-600 rounded-full group-hover/link:bg-purple-400 transition-colors"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform">GitHub</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="group">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-white font-semibold text-lg">Connect</h4>
            </div>
            <p className="text-gray-400 text-sm mb-4">Join our growing community across platforms</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://discord.gg/qie"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1A1A1A] hover:bg-[#5865F2] border border-gray-700 hover:border-[#5865F2] rounded-lg flex items-center justify-center transition-all duration-300 group/social"
              >
                <MessageCircle className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com/qienetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1A1A1A] hover:bg-[#1DA1F2] border border-gray-700 hover:border-[#1DA1F2] rounded-lg flex items-center justify-center transition-all duration-300 group/social"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" />
              </a>
              <a
                href="https://t.me/qienetwork"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1A1A1A] hover:bg-[#0088cc] border border-gray-700 hover:border-[#0088cc] rounded-lg flex items-center justify-center transition-all duration-300 group/social"
              >
                <Send className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" />
              </a>
              <a
                href="https://github.com/qie-network"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1A1A1A] hover:bg-[#333] border border-gray-700 hover:border-[#333] rounded-lg flex items-center justify-center transition-all duration-300 group/social"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <p className="text-gray-500">
                © 2025 SafeMint. Built on QIE Mainnet.
              </p>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-400 font-medium">All Systems Operational</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                <span className="group-hover:underline">Privacy Policy</span>
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                <span className="group-hover:underline">Terms of Service</span>
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                <span className="group-hover:underline">Cookie Policy</span>
              </Link>
            </div>
          </div>

          {/* Extra Bottom Badge */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37]/5 via-cyan-500/5 to-purple-500/5 border border-gray-800 px-6 py-2 rounded-full">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs text-gray-400">Audited & Secured by Industry Leaders</span>
              <Droplet className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
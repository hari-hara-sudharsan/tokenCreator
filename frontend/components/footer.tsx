"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#D4AF37]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-[#D4AF37] font-bold text-lg mb-4">
              SafeMint
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The trusted platform for secure and transparent token launches on the QIE blockchain.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/#create" className="hover:text-[#D4AF37] transition-colors">
                  Create Token
                </Link>
              </li>
              <li>
                <Link href="/#add-liquidity" className="hover:text-[#D4AF37] transition-colors">
                  Lock Liquidity
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="hover:text-[#D4AF37] transition-colors">
                  Trust Score
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#D4AF37] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://docs.qie.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  QIE Official Docs
                </a>
              </li>
              <li>
                <a
                  href="https://docs.safemint.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  SafeMint Docs
                </a>
              </li>
              <li>
                <a
                  href="https://docs.safemint.app/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#D4AF37] transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://discord.gg/qie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/qienetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/qienetwork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/qie-network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 SafeMint. Built on QIE Mainnet.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-[#D4AF37] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

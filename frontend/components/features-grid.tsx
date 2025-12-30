"use client"

import { Rocket, Lock, ShieldCheck, Users, TrendingUp, FileCheck } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Rocket,
    title: "Fair Launch",
    description:
      "Transparent, community-driven token launches with no pre-mined supply. Equal access for all participants from day one.",
    color: "#D4AF37",
  },
  {
    icon: Lock,
    title: "Locked Liquidity",
    description:
      "Liquidity securely locked in DEX pools to prevent sudden withdrawals. Build confidence with verifiable time-locks.",
    color: "#00BFFF",
  },
  {
    icon: ShieldCheck,
    title: "Trust Score System",
    description:
      "Dynamic indicators based on contract verification, ownership status, and on-chain audits. Know before you invest.",
    color: "#32CD32",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Governed by the community with transparent voting mechanisms. Your voice matters in project decisions.",
    color: "#FFD700",
  },
  {
    icon: TrendingUp,
    title: "Anti-Rug Pull",
    description:
      "Built-in mechanisms to prevent malicious contract behavior. Automatic checks for common exploit patterns.",
    color: "#D4AF37",
  },
  {
    icon: FileCheck,
    title: "Verified Contracts",
    description:
      "All contracts undergo rigorous verification. Source code published and audited for complete transparency.",
    color: "#00BFFF",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Why Choose <span className="text-[#D4AF37]">SafeMint</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto text-pretty">
            Industry-leading security features and transparency tools to protect your community and build lasting trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-[#1A1A1A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 group hover:scale-105 p-6"
            >
              <feature.icon
                className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
                style={{ color: feature.color }}
              />
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#D4AF37] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

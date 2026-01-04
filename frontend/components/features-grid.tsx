"use client"

import { Rocket, Lock, ShieldCheck, Users, TrendingUp, FileCheck, Sparkles, ArrowRight, Star, Zap, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Rocket,
    title: "Fair Launch",
    description:
      "Transparent, community-driven token launches with no pre-mined supply. Equal access for all participants from day one.",
    color: "#D4AF37",
    gradient: "from-[#D4AF37] to-amber-600",
    bgGradient: "from-[#D4AF37]/10 via-amber-500/5 to-transparent",
    shadow: "shadow-[#D4AF37]/20",
  },
  {
    icon: Lock,
    title: "Locked Liquidity",
    description:
      "Liquidity securely locked in DEX pools to prevent sudden withdrawals. Build confidence with verifiable time-locks.",
    color: "#00BFFF",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    shadow: "shadow-cyan-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Trust Score System",
    description:
      "Dynamic indicators based on contract verification, ownership status, and on-chain audits. Know before you invest.",
    color: "#32CD32",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Governed by the community with transparent voting mechanisms. Your voice matters in project decisions.",
    color: "#FFD700",
    gradient: "from-yellow-500 to-orange-600",
    bgGradient: "from-yellow-500/10 via-orange-500/5 to-transparent",
    shadow: "shadow-yellow-500/20",
  },
  {
    icon: TrendingUp,
    title: "Anti-Rug Pull",
    description:
      "Built-in mechanisms to prevent malicious contract behavior. Automatic checks for common exploit patterns.",
    color: "#D4AF37",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
    shadow: "shadow-purple-500/20",
  },
  {
    icon: FileCheck,
    title: "Verified Contracts",
    description:
      "All contracts undergo rigorous verification. Source code published and audited for complete transparency.",
    color: "#00BFFF",
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
    shadow: "shadow-indigo-500/20",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-40 bg-black overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[200px] opacity-15 animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[15%] w-[700px] h-[700px] bg-cyan-500 rounded-full blur-[220px] opacity-15 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[45%] w-[500px] h-[500px] bg-purple-500 rounded-full blur-[180px] opacity-12 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[60%] right-[40%] w-[400px] h-[400px] bg-pink-500 rounded-full blur-[160px] opacity-10 animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-[40%] left-[30%] w-[550px] h-[550px] bg-emerald-500 rounded-full blur-[190px] opacity-12 animate-pulse-slow" style={{ animationDelay: '8s' }}></div>
      </div>

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(#D4AF37 1.5px, transparent 1.5px),
          linear-gradient(90deg, #D4AF37 1.5px, transparent 1.5px),
          linear-gradient(#00BFFF 1px, transparent 1px),
          linear-gradient(90deg, #00BFFF 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px'
      }}></div>

      {/* Multiple Radial Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_30%,black_100%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_30%,black_100%)] opacity-60"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)] opacity-70"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-supreme"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#00BFFF' : '#32CD32',
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
              opacity: Math.random() * 0.5 + 0.2,
              boxShadow: `0 0 ${Math.random() * 15 + 10}px currentColor`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Supreme Header Section */}
        <div className="text-center mb-24">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1A1A1A]/90 via-[#0F0F0F]/90 to-[#1A1A1A]/90 border-2 border-[#D4AF37]/50 px-6 py-3 rounded-full mb-8 backdrop-blur-xl shadow-2xl shadow-[#D4AF37]/20 group hover:border-[#D4AF37] hover:scale-105 transition-all duration-500">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
              <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-60"></div>
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] bg-clip-text text-transparent">
              Premium Features
            </span>
            <Award className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Supreme Heading */}
          <div className="mb-8 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60"></div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 text-balance tracking-tight">
              <span className="text-white drop-shadow-2xl">Why Choose </span>
              <span className="relative inline-block group">
                <span className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] via-amber-300 to-[#D4AF37] blur-3xl opacity-60 group-hover:opacity-80 transition-opacity"></span>
                <span className="relative bg-gradient-to-r from-[#D4AF37] via-amber-300 via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent animate-gradient-supreme drop-shadow-2xl">
                  SafeMint
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></span>
              </span>
            </h2>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60"></div>
          </div>
          
          {/* Enhanced Subtitle */}
          <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto text-pretty leading-relaxed font-light mt-12">
            Industry-leading{" "}
            <span className="relative inline-block group/word">
              <span className="relative z-10 text-cyan-300 font-semibold">security features</span>
              <span className="absolute inset-0 bg-cyan-500/20 blur-lg group-hover/word:bg-cyan-500/30 transition-colors"></span>
            </span>{" "}
            and{" "}
            <span className="relative inline-block group/word">
              <span className="relative z-10 text-emerald-300 font-semibold">transparency tools</span>
              <span className="absolute inset-0 bg-emerald-500/20 blur-lg group-hover/word:bg-emerald-500/30 transition-colors"></span>
            </span>{" "}
            to protect your community and build lasting trust.
          </p>

          {/* Enhanced Decorative Elements */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            <div className="relative">
              <Star className="w-6 h-6 text-[#D4AF37] animate-spin-slow" />
              <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-60"></div>
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          </div>
        </div>

        {/* Supreme Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Triple Glow Effect */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 animate-pulse-glow`}></div>
              <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500`}></div>
              
              {/* Supreme Card */}
              <Card className="relative bg-gradient-to-br from-[#1A1A1A]/95 via-[#1F1F1F]/95 to-[#1A1A1A]/95 border-2 border-gray-800/50 hover:border-gray-700 transition-all duration-700 group-hover:scale-[1.05] p-10 rounded-3xl h-full overflow-hidden backdrop-blur-xl shadow-2xl">
                {/* Enhanced Background Gradient */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${feature.bgGradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2`}></div>
                
                {/* Scanning Light Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Supreme Icon Container */}
                  <div className="mb-8">
                    <div className="relative inline-block group/icon">
                      {/* Triple glow layers */}
                      <div className={`absolute -inset-2 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-700`}></div>
                      <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      <div className={`relative bg-gradient-to-br ${feature.gradient} p-5 rounded-2xl ${feature.shadow} shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 border-2 border-white/10`}>
                        <feature.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Sparkle effect on icon */}
                      <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-white opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" style={{ color: feature.color }} />
                    </div>
                  </div>

                  {/* Supreme Title */}
                  <h3 className="text-3xl font-black mb-5 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-500 drop-shadow-lg" style={{ backgroundImage: `linear-gradient(to right, ${feature.color}, ${feature.color})` }}>
                    {feature.title}
                  </h3>

                  {/* Enhanced Description */}
                  <p className="text-gray-400 leading-relaxed mb-8 text-base group-hover:text-gray-300 transition-colors duration-500">
                    {feature.description}
                  </p>

                  {/* Enhanced Learn More Link */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-base font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-3 group-hover:translate-y-0">
                      <span style={{ color: feature.color }}>Learn more</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" style={{ color: feature.color }} />
                    </div>
                    
                    {/* Rating indicator */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" style={{ color: feature.color, animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                
                {/* Corner Accents */}
                <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} style={{ borderColor: feature.color }}></div>
                <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} style={{ borderColor: feature.color }}></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Supreme Bottom CTA Section */}
        <div className="mt-28 text-center">
          <div className="relative inline-block max-w-3xl">
            {/* Outer glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-cyan-500 rounded-3xl blur-2xl opacity-30 animate-pulse-glow"></div>
            
            <div className="relative flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-br from-[#1A1A1A]/95 via-[#1F1F1F]/95 to-[#1A1A1A]/95 border-2 border-[#D4AF37]/40 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
              <div className="flex-1 text-left">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 flex items-center gap-3">
                  <Zap className="w-7 h-7 text-[#D4AF37]" />
                  Ready to launch securely?
                </h3>
                <p className="text-gray-400 text-base md:text-lg">Start building trust with your community today.</p>
              </div>
              
              <div className="relative group/btn">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 rounded-2xl blur-lg opacity-60 group-hover/btn:opacity-100 transition-opacity"></div>
                
                <button className="relative bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 hover:from-[#E5C158] hover:via-amber-400 hover:to-amber-500 text-black font-black text-lg px-10 py-4 rounded-2xl transition-all duration-500 shadow-2xl shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/60 hover:scale-110 flex items-center gap-3 border-2 border-amber-300/30">
                  <Sparkles className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" />
                  Get Started
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  
                  {/* Inner shine */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 rounded-2xl"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-supreme {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        @keyframes float-supreme {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(25px, -35px) rotate(90deg); }
          50% { transform: translate(-15px, -70px) rotate(180deg); }
          75% { transform: translate(-35px, -35px) rotate(270deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient-supreme {
          background-size: 300% auto;
          animation: gradient-supreme 4s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-float-supreme {
          animation: float-supreme linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
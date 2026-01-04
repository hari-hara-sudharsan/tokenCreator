"use client"

import { ArrowRight, Sparkles, Shield, Lock, TrendingUp, Zap, ChevronDown, Star, Award, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()

  const handleLaunchToken = () => {
    const el = document.getElementById("create")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleViewDocs = () => {
    router.push("/docs")
  }

  return (
    <section className="relative overflow-hidden bg-black pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex items-center">
      {/* Animated Background Orbs - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[180px] opacity-25 animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] right-[20%] w-[700px] h-[700px] bg-cyan-500 rounded-full blur-[200px] opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full blur-[250px] opacity-15 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-[10%] right-[30%] w-[400px] h-[400px] bg-pink-500 rounded-full blur-[150px] opacity-10 animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
        <div className="absolute bottom-[30%] left-[25%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[170px] opacity-15 animate-pulse-slow" style={{ animationDelay: '8s' }}></div>
      </div>

      {/* Multiple Radial Overlays for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,black_70%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,transparent_0%,black_70%)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,black_100%)] opacity-70" />

      {/* Enhanced Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(#D4AF37 1.5px, transparent 1.5px),
          linear-gradient(90deg, #D4AF37 1.5px, transparent 1.5px),
          linear-gradient(#00BFFF 1px, transparent 1px),
          linear-gradient(90deg, #00BFFF 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        backgroundPosition: '0 0, 0 0, 0 0, 0 0'
      }}></div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent animate-scan"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-complex"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#00BFFF' : '#32CD32',
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: Math.random() * 0.6 + 0.2,
              boxShadow: `0 0 ${Math.random() * 20 + 10}px currentColor`
            }}
          />
        ))}
      </div>

      {/* Spotlight Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced Badge with More Effects */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1A1A1A]/90 via-[#0F0F0F]/90 to-[#1A1A1A]/90 border-2 border-[#D4AF37]/50 rounded-full px-8 py-4 mb-10 backdrop-blur-xl shadow-2xl shadow-[#D4AF37]/20 group hover:border-[#D4AF37] hover:shadow-[#D4AF37]/40 transition-all duration-500 hover:scale-105">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-[#D4AF37] animate-pulse" />
              <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-60 animate-pulse"></div>
            </div>
            <span className="text-base md:text-lg font-semibold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Secure, Transparent, Community-Driven
            </span>
            <div className="flex items-center gap-1">
              <Award className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Ultra-Enhanced Main Heading */}
          <div className="mb-10 relative">
            {/* Glow lines above and below */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 text-balance leading-[0.95] tracking-tighter">
              <span className="block mb-4 text-white drop-shadow-2xl">
                Launch Your Token
              </span>
              <span className="relative inline-block group">
                {/* Multiple layered glows */}
                <span className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-cyan-500 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity"></span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-cyan-500 blur-xl opacity-70"></span>
                
                {/* Main gradient text */}
                <span className="relative bg-gradient-to-r from-[#D4AF37] via-[#FFD700] via-amber-300 to-cyan-400 bg-clip-text text-transparent animate-gradient-flow drop-shadow-2xl">
                  Safely &amp; Fairly
                </span>
                
                {/* Shimmer effect overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></span>
              </span>
            </h1>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
          </div>

          {/* Enhanced Subtitle with More Highlights */}
          <p className="text-xl md:text-3xl text-gray-300 mb-14 max-w-4xl mx-auto text-pretty leading-relaxed font-light">
            Create transparent token launches with{" "}
            <span className="relative inline-block group/word">
              <span className="relative z-10 text-cyan-300 font-semibold">locked liquidity</span>
              <span className="absolute inset-0 bg-cyan-500/20 blur-lg group-hover/word:bg-cyan-500/30 transition-colors"></span>
            </span>,{" "}
            <span className="relative inline-block group/word">
              <span className="relative z-10 text-emerald-300 font-semibold">anti-rug-pull protection</span>
              <span className="absolute inset-0 bg-emerald-500/20 blur-lg group-hover/word:bg-emerald-500/30 transition-colors"></span>
            </span>, and{" "}
            <span className="relative inline-block group/word">
              <span className="relative z-10 text-[#D4AF37] font-semibold">community trust scores</span>
              <span className="absolute inset-0 bg-[#D4AF37]/20 blur-lg group-hover/word:bg-[#D4AF37]/30 transition-colors"></span>
            </span>{" "}
            powered by blockchain verification.
          </p>

          {/* Ultra-Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            {/* Primary Button - Ultimate Premium */}
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] via-amber-400 via-[#FFD700] to-amber-500 rounded-2xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow"></div>
              
              {/* Middle glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <Button
                size="lg"
                onClick={handleLaunchToken}
                className="relative bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 hover:from-[#E5C158] hover:via-amber-400 hover:to-amber-500 text-black font-black text-xl px-12 py-8 h-auto rounded-2xl transition-all duration-500 group shadow-2xl shadow-[#D4AF37]/50 hover:shadow-[#D4AF37]/70 hover:scale-110 border-2 border-amber-300/50"
              >
                <Sparkles className="mr-3 w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                Launch Token
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
                
                {/* Inner shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl"></span>
              </Button>
            </div>

            {/* Secondary Button - Enhanced */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/30 to-cyan-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleViewDocs}
                className="relative border-3 border-[#D4AF37]/60 text-white hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 bg-black/60 backdrop-blur-xl font-bold text-xl px-12 py-8 h-auto rounded-2xl group-hover:scale-110 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#D4AF37]/30"
              >
                <Shield className="mr-3 w-6 h-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                View Documentation
                
                {/* Inner border shine */}
                <span className="absolute inset-[2px] rounded-2xl bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
              </Button>
            </div>
          </div>

          {/* Ultra-Premium Stats Section */}
          <div className="relative">
            {/* Enhanced Decorative Elements */}
            <div className="flex items-center justify-center gap-6 mb-16">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
              <div className="relative">
                <Star className="w-6 h-6 text-[#D4AF37] animate-spin-slow" />
                <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-60"></div>
              </div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Stat 1 - Enhanced */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse-glow"></div>
                <div className="relative bg-gradient-to-br from-[#1A1A1A]/95 via-[#1F1F1F]/95 to-[#1A1A1A]/95 border-2 border-[#D4AF37]/40 rounded-3xl p-8 md:p-10 hover:border-[#D4AF37]/80 transition-all duration-500 backdrop-blur-xl group-hover:scale-105 shadow-2xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-[#D4AF37] via-amber-500 to-amber-600 p-3 rounded-xl shadow-lg">
                        <TrendingUp className="w-7 h-7 text-black" />
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                    500+
                  </div>
                  <div className="text-base md:text-lg text-gray-300 font-semibold mb-2">Tokens Launched</div>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stat 2 - Enhanced */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-green-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
                <div className="relative bg-gradient-to-br from-[#1A1A1A]/95 via-[#1F1F1F]/95 to-[#1A1A1A]/95 border-2 border-emerald-500/40 rounded-3xl p-8 md:p-10 hover:border-emerald-500/80 transition-all duration-500 backdrop-blur-xl group-hover:scale-105 shadow-2xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                        <Lock className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-green-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                    $10M+
                  </div>
                  <div className="text-base md:text-lg text-gray-300 font-semibold mb-2">Liquidity Locked</div>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Check key={i} className="w-3 h-3 text-emerald-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Stat 3 - Enhanced */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
                <div className="relative bg-gradient-to-br from-[#1A1A1A]/95 via-[#1F1F1F]/95 to-[#1A1A1A]/95 border-2 border-cyan-500/40 rounded-3xl p-8 md:p-10 hover:border-cyan-500/80 transition-all duration-500 backdrop-blur-xl group-hover:scale-105 shadow-2xl">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                        <Shield className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-300 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                    99.8%
                  </div>
                  <div className="text-base md:text-lg text-gray-300 font-semibold mb-2">Trust Score Avg</div>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="mt-20 flex flex-col items-center gap-4 animate-bounce-slow">
            <div className="relative">
              <span className="text-sm text-gray-400 uppercase tracking-[0.3em] font-bold">Explore Features</span>
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
            </div>
            <div className="relative">
              <ChevronDown className="w-8 h-8 text-[#D4AF37]" />
              <div className="absolute inset-0 bg-[#D4AF37] blur-lg opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float-complex {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -40px) rotate(90deg); }
          50% { transform: translate(-20px, -80px) rotate(180deg); }
          75% { transform: translate(-40px, -40px) rotate(270deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient-flow {
          background-size: 300% auto;
          animation: gradient-flow 4s ease infinite;
        }
        
        .animate-float-complex {
          animation: float-complex linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
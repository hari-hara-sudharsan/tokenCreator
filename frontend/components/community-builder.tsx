"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Copy, Check } from "lucide-react"
import {
  recordShare,
  getShareCounts,
  ShareType,
} from "@/lib/communityAnalytics"

/* ✅ PROPS ARE EXPLICIT */
type Props = {
  tokenAddress: string
}

export function CommunityBuilder({ tokenAddress }: Props) {
  const [copied, setCopied] = useState<ShareType | null>(null)
  const [counts, setCounts] = useState({
    twitter: 0,
    discord: 0,
    reddit: 0,
  })

  /* Load analytics */
  useEffect(() => {
    setCounts(getShareCounts(tokenAddress))
  }, [tokenAddress])

  const handleShare = async (
    text: string,
    type: ShareType,
    url: string
  ) => {
    await navigator.clipboard.writeText(text)
    recordShare(tokenAddress, type)
    setCounts(getShareCounts(tokenAddress))
    setCopied(type)
    window.open(url, "_blank")
    setTimeout(() => setCopied(null), 1200)
  }

  /* Share content (unchanged UI) */
  const twitterText = `🚀 New token launched via SafeMint!\n\nToken: ${tokenAddress}`
  const discordText = `📢 New SafeMint Token\n\n${tokenAddress}`
  const redditText = `New token launched via SafeMint\n\n${tokenAddress}`

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    twitterText
  )}`
  const discordUrl = "https://discord.com/channels/@me"
  const redditUrl = `https://www.reddit.com/submit?text=${encodeURIComponent(
    redditText
  )}`

  const platforms = [
    {
      name: "Twitter",
      type: "twitter" as ShareType,
      text: twitterText,
      url: twitterUrl,
      count: counts.twitter,
      gradient: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      hoverGlow: "hover:shadow-blue-500/20",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Discord",
      type: "discord" as ShareType,
      text: discordText,
      url: discordUrl,
      count: counts.discord,
      gradient: "from-indigo-400 to-purple-400",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
      hoverGlow: "hover:shadow-indigo-500/20",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
    {
      name: "Reddit",
      type: "reddit" as ShareType,
      text: redditText,
      url: redditUrl,
      count: counts.reddit,
      gradient: "from-orange-400 to-red-400",
      bgGradient: "from-orange-500/10 to-red-500/10",
      hoverGlow: "hover:shadow-orange-500/20",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
    },
  ]

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-black via-[#0A0A0A] to-black border border-[#D4AF37]/20 p-6 shadow-2xl">
      {/* Ambient background effects */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full" />
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30">
              <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Community Builder
            </h3>
            <p className="text-xs text-gray-500">Share and grow your network</p>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div
              key={platform.type}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0D0D0D] to-black hover:border-white/10 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${platform.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${platform.bgGradient} border border-white/5 text-transparent bg-clip-text`}>
                      <div className={`bg-gradient-to-r ${platform.gradient} bg-clip-text text-transparent`}>
                        {platform.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{platform.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs text-gray-400">
                            {platform.count} shares
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleShare(platform.text, platform.type, platform.url)}
                    className={`relative group/btn px-4 py-2 rounded-lg bg-gradient-to-r ${platform.bgGradient} hover:${platform.bgGradient} border border-white/10 hover:border-white/20 transition-all duration-300 ${platform.hoverGlow} shadow-lg`}
                  >
                    <span className={`font-semibold text-sm bg-gradient-to-r ${platform.gradient} bg-clip-text text-transparent`}>
                      Share
                    </span>
                    <div className="ml-2 inline-block">
                      {copied === platform.type ? (
                        <Check className={`w-4 h-4 text-emerald-400 animate-in zoom-in duration-200`} />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 group-hover/btn:text-gray-300 transition-colors" />
                      )}
                    </div>
                  </Button>
                </div>

                {/* Progress bar */}
                <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${platform.gradient} rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.min((platform.count / 10) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
            </div>
          ))}
        </div>

        {/* Footer stats */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs text-gray-400">
              Total: {counts.twitter + counts.discord + counts.reddit} shares
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Keep sharing to grow
          </div>
        </div>
      </div>
    </Card>
  )
}
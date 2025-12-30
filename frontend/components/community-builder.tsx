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

  return (
    <Card className="bg-black/40 border border-[#D4AF37]/20 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
        <h3 className="font-semibold text-white">Community Builder</h3>
      </div>

      {/* Twitter */}
      <Button
        variant="outline"
        onClick={() => handleShare(twitterText, "twitter", twitterUrl)}
        className="w-full flex justify-between"
      >
        Copy Twitter
        {copied === "twitter" ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <p className="text-xs text-gray-500">
        Shared {counts.twitter} times
      </p>

      {/* Discord */}
      <Button
        variant="outline"
        onClick={() => handleShare(discordText, "discord", discordUrl)}
        className="w-full flex justify-between"
      >
        Copy Discord
        {copied === "discord" ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <p className="text-xs text-gray-500">
        Shared {counts.discord} times
      </p>

      {/* Reddit */}
      <Button
        variant="outline"
        onClick={() => handleShare(redditText, "reddit", redditUrl)}
        className="w-full flex justify-between"
      >
        Copy Reddit
        {copied === "reddit" ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <p className="text-xs text-gray-500">
        Shared {counts.reddit} times
      </p>
    </Card>
  )
}

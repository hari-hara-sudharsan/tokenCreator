// lib/trustScore.ts
import { ethers } from "ethers"
import { getTotalShares } from "./communityAnalytics"

export function calculateTrendingScore(
  token: string,
  trustScore: number
) {
  const shares = getTotalShares(token)

  // Simple + explainable formula
  const trendingScore = trustScore + shares * 2

  return Math.min(100, trendingScore)
}


export type TrustLevel = "high" | "medium" | "low"

export interface TrustResult {
    score: number
    level: TrustLevel
    checks: {
        name: string
        passed: boolean
        description: string
    }[]
}

export function calculateTrustScore(
    info: {
        token: string
        creator: string
        liquidityLock: string
        lockExpiry: bigint | number
        liquidityAdded: boolean
    }
    , currentTime?: number
): TrustResult {
    const now = currentTime || Math.floor(Date.now() / 1000)

    const checks = [
        {
            name: "Token Created",
            passed: info.token !== ethers.ZeroAddress,
            description: "Token was created via SafeMint factory",
        },
        {
            name: "Creator Identified",
            passed: info.creator !== ethers.ZeroAddress,
            description: "Token creator address is registered",
        },
        {
            name: "Liquidity Lock Contract",
            passed: info.liquidityLock !== ethers.ZeroAddress,
            description: "Liquidity lock contract deployed",
        },
        {
            name: "Lock Period Active",
            passed: Number(info.lockExpiry) > now,
            description: "Liquidity lock has not expired",
        },
        {
            name: "Liquidity Added",
            passed: info.liquidityAdded,
            description: "Liquidity has been added to the pool",
        },
    ]

    const passedCount = checks.filter(c => c.passed).length
    const score = Math.round((passedCount / checks.length) * 100)

    let level: TrustLevel = "low"
    if (score >= 75) level = "high"
    else if (score >= 45) level = "medium"

    return { score, level, checks }
}

export function applyTimeDecay(
  baseScore: number,
  createdAt: number,
  now: number = Math.floor(Date.now() / 1000)
) {
  const ageSeconds = now - createdAt
  const ageDays = ageSeconds / 86400

  let boost = 0

  if (ageDays < 1) boost = 15
  else if (ageDays < 3) boost = 10
  else if (ageDays < 7) boost = 5

  return Math.min(100, baseScore + boost)
}

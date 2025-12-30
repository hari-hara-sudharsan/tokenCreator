// lib/communityAnalytics.ts

export type ShareType = "twitter" | "discord" | "reddit"

type AnalyticsStore = {
  [token: string]: Record<ShareType, number>
}

const STORAGE_KEY = "safemint-community-analytics"

export function getShareCounts(token: string) {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { twitter: 0, discord: 0, reddit: 0 }

  const data: AnalyticsStore = JSON.parse(raw)
  return data[token] || { twitter: 0, discord: 0, reddit: 0 }
}

export function recordShare(token: string, type: ShareType) {
  const raw = localStorage.getItem(STORAGE_KEY)
  const data: AnalyticsStore = raw ? JSON.parse(raw) : {}

  if (!data[token]) {
    data[token] = { twitter: 0, discord: 0, reddit: 0 }
  }

  data[token][type] += 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/* ✅ ADD THIS FUNCTION */
export function getTotalShares(token: string): number {
  const counts = getShareCounts(token)
  return counts.twitter + counts.discord + counts.reddit
}

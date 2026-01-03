let tokenCache: any[] | null = null
let lastFetch = 0
const TTL = 30_000 // 30 seconds

export function getCachedTokens() {
  if (!tokenCache) return null
  if (Date.now() - lastFetch > TTL) return null
  return tokenCache
}

export function setCachedTokens(data: any[]) {
  tokenCache = data
  lastFetch = Date.now()
}

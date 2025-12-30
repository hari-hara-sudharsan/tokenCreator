export function getCache<T>(key: string, ttl = 30000): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null

    const { data, time } = JSON.parse(raw)
    if (Date.now() - time > ttl) return null

    return data
  } catch {
    return null
  }
}

export function setCache<T>(key: string, data: T) {
  localStorage.setItem(
    key,
    JSON.stringify({ data, time: Date.now() })
  )
}

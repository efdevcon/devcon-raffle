import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'

const tokenCache = new LRUCache<string, number>({
  max: 1000, // 1000 users per min
  ttl: 60000, // 1min
})

export default function rateLimit(_res: NextResponse, limit: number, token: string) {
  const tokenCount = (tokenCache.get(token) || 0) + 1
  tokenCache.set(token, tokenCount)

  const currentUsage = tokenCount
  const isRateLimited = currentUsage >= limit
  const remaining = isRateLimited ? 0 : limit - currentUsage
  return {
    isRateLimited,
    limit,
    remaining,
  }
}

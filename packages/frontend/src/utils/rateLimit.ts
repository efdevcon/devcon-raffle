import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'

const tokenCache = new LRUCache({
  max: 1000, // 1000 users per min
  ttl: 60000, // 1min
})

export default function rateLimit(res: NextResponse, limit: number, token: string) {
  const tokenCount = (tokenCache.get(token) as number[]) || [0]
  if (tokenCount[0] === 0) {
    tokenCache.set(token, tokenCount)
  }
  tokenCount[0] += 1

  const currentUsage = tokenCount[0]
  const isRateLimited = currentUsage >= limit
  const remaining = isRateLimited ? 0 : limit - currentUsage
  return {
    isRateLimited,
    limit,
    remaining,
  }
}

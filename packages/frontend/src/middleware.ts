import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import rateLimit from './utils/rateLimit'
import { environment } from './config/environment'
import log from './utils/log'

export function middleware(request: NextRequest) {
  const requestIp = request.ip || request.headers.get('x-forwarded-for')
  if (!requestIp) {
    log.error(`Unable to get request IP`)
    return NextResponse.json(
      {
        error: 'Unable to get request IP',
      },
      {
        status: 500,
      },
    )
  }
  const isNonceGetter = request.url.toLowerCase().endsWith('/nonce')
  const rateLimitToken = isNonceGetter ? `${requestIp}-nonce` : requestIp
  const rateLimitValue = isNonceGetter ? environment.rateLimit.nonce : environment.rateLimit.global

  const response = NextResponse.next()
  const { isRateLimited, limit, remaining } = rateLimit(response, rateLimitValue, rateLimitToken)
  if (isRateLimited) {
    return NextResponse.json(
      {
        error: 'Too many requests',
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        },
      },
    )
  } else {
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    return response
  }
}

export const config = {
  matcher: '/api/:path*',
}

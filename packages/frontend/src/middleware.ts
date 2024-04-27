import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import rateLimit from './utils/rateLimit'
import { environment } from './config/environment'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let rateLimitToken = request.cookies.get('rateLimitToken')?.value
  if (!rateLimitToken) {
    rateLimitToken = crypto.randomUUID()
    response.cookies.set({
      name: 'rateLimitToken',
      value: rateLimitToken,
      httpOnly: true,
      maxAge: 60,
      secure: true,
    })
  }
  const { isRateLimited, limit, remaining } = await rateLimit(response, environment.rateLimit.global, rateLimitToken)
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

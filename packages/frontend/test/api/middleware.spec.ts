// @vitest-environment node
import { expect, test, describe } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from '@/middleware'
import { environment } from '@/config/environment'

describe('Middleware', () => {
  test('global rate limiter', async () => {
    const req = new NextRequest('https://auctionraffle/api/whatever', {
      ip: '123.123.123.123',
    })
    for (let i = 0; i < environment.rateLimit.global - 1; i++) {
      const response = middleware(req)
      expect(response.status).to.eq(200)
    }
    const response = middleware(req)
    expect(response.status).to.eq(429)
  })

  test('nonce rate limiter', async () => {
    const req = new NextRequest('https://auctionraffle/api/nonce', {
      ip: '123.123.123.123',
    })
    for (let i = 0; i < environment.rateLimit.nonce - 1; i++) {
      const response = middleware(req)
      expect(response.status).to.eq(200)
    }
    const response = middleware(req)
    expect(response.status).to.eq(429)
  })
})

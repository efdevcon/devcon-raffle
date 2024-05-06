/** @type {import('next/dist/lib/load-custom-routes').Header[]} */
const corsHeaders = process.env.WHITELISTED_ORIGINS
  ? [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.WHITELISTED_ORIGINS },
          { key: 'Access-Control-Allow-Methods', value: 'GET,PUT,POST,DELETE,OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, Cookie',
          },
        ],
      },
    ]
  : []

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  async headers() {
    return [...corsHeaders]
  },
}

export default nextConfig

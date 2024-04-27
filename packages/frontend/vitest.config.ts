import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'test',
    env: {
      VOUCHER_CODES: 'ba6c54fde086a987,4a90b64c32e2eec1,4456f133d558f072',
      RATE_LIMIT_GLOBAL: '100',
      RATE_LIMIT_NONCES: '5',
      NONCE_EXPIRY: '1000',
    },
  },
})

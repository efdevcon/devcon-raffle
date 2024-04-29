import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const setup = ({ mode }: { mode: string }) => {
  Object.assign(process.env, loadEnv(mode, './', ''))
  return defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      dir: 'test',
    },
  })
}

export default setup

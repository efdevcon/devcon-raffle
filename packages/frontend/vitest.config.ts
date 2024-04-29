import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const setup = ({ mode }: { mode: string }) => {
  dotenv.config({ path: `.env.${mode}` })
  return defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      dir: 'test',
    },
  })
}

export default setup

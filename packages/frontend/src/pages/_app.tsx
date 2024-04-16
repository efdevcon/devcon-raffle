import { GlobalStyles } from '@/styles/GobalStyles'
import type { AppProps } from 'next/app'
import { BlockchainProviders } from '@/providers/wagmi'
import { BidsProvider } from '@/providers/BidsProvider/provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BlockchainProviders>
      <BidsProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </BidsProvider>
    </BlockchainProviders>
  )
}

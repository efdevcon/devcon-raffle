import { GlobalStyles } from '@/styles/GobalStyles'
import type { AppProps } from 'next/app'
import { BlockchainProviders } from '@/providers/wagmi'
import { BidsProvider } from '@/providers/BidsProvider/provider'
import { ReactNode } from 'react'
import { TopBar } from '@/components/topBar/TopBar'
import { Footer } from '@/components/footer/Footer'
import { Toaster } from 'sonner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BlockchainProviders>
      <BidsProvider>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster richColors duration={5000} />
      </BidsProvider>
    </BlockchainProviders>
  )
}

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <TopBar />
    <main>{children}</main>
    <Footer />
  </>
)

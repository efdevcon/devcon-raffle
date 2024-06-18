import { GlobalStyles } from '@/styles/GobalStyles'
import type { AppContext, AppProps } from 'next/app'
import { BlockchainProviders } from '@/providers/wagmi'
import { BidsProvider } from '@/providers/BidsProvider/provider'
import { ReactNode } from 'react'
import { TopBar } from '@/components/topBar/TopBar'
import { Footer } from '@/components/footer/Footer'
import { Toaster } from 'sonner'
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "@/config/wagmiConfig";

export default function App({ Component, pageProps, cookie }: AppProps & CustomProps) {
  const initialState = cookieToInitialState(wagmiConfig, cookie)

  return (
    <BlockchainProviders initialState={initialState}>
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

interface CustomProps {
  cookie: string | undefined
}

App.getInitialProps = async (
  context: AppContext,
): Promise<CustomProps> => {
  return { cookie: context.ctx.req?.headers.cookie }
}

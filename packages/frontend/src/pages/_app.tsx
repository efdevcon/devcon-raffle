import {GlobalStyles} from "@/styles/GobalStyles";
import type {AppProps} from "next/app";
import {BlockchainProviders} from "@/providers/wagmi";

export default function App({Component, pageProps}: AppProps) {
  return (
    <BlockchainProviders>
      <GlobalStyles/>
      <Component {...pageProps} />
    </BlockchainProviders>
  )
}

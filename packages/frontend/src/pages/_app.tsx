import "../styles/globals.css";
import type {AppProps} from "next/app";
import {BlockchainProviders} from "@/providers/wagmi";

export default function App({Component, pageProps}: AppProps) {
  return (
    <BlockchainProviders>
      <Component {...pageProps} />
    </BlockchainProviders>
  )
}

import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";
import { ProvidersRedux } from "@/redux/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProvidersRedux>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ProvidersRedux>
  );
}

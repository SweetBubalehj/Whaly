import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import merge from "lodash.merge";
import {
  darkTheme,
  Theme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  base,
  linea,
  mantle,
  xdc,
  polygon,
  arbitrum,
  celo,
  scrollSepolia,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Header from "../components/Header/Header";

type ChainWithIcon = Chain & { iconUrl: string };

const lineaWithIcon: ChainWithIcon = {
  ...linea,
  iconUrl: "https://svgshare.com/i/yd3.svg",
};

const xdcWithIcon: ChainWithIcon = {
  ...xdc,
  iconUrl: "https://svgur.com/i/ztX.svg",
};

const mantleWithIcon: ChainWithIcon = {
  ...mantle,
  iconUrl: "https://svgshare.com/i/ztT.svg",
};

const celoWithIcon: ChainWithIcon = {
  ...celo,
  iconUrl: "https://svgur.com/i/zrb.svg",
};

const scrollSepoliaWithIcon: ChainWithIcon = {
  ...scrollSepolia,
  iconUrl: "https://svgur.com/i/zsL.svg",
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base, lineaWithIcon, mantleWithIcon, xdcWithIcon, arbitrum, celoWithIcon, scrollSepoliaWithIcon],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Whaly",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID
    ? process.env.NEXT_PUBLIC_PROJECT_ID
    : "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const myTheme = merge(darkTheme(), {
  fonts: {
    body: "TT Firs Neue Trl",
  },
} as Theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider locale="en-US" theme={myTheme} chains={chains}>
        <Header />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

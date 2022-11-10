import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HistoryTable from './Components/Table/Table';
import Home from './pages/Home';
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SnackbarProvider } from "notistack";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { config } from 'dotenv';


const bscChain = {
  id: 97,
  name: 'Binance Smart Chain',
  network: 'bsc',
  iconUrl: 'https://icons8.com/icon/63192/bitcoin',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Coin',
    symbol: 'WBNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed4.binance.org/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://www.bscscan.com/' },
    bsc: { name: 'BscScan', url: 'https://www.bscscan.com/' },
  },
  testnet: false,
};

const { provider, chains } = configureChains(
  [bscChain],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);


const { connectors } = getDefaultWallets({
  appName: "THUNDER SWAP",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
function App() {
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>

          <SnackbarProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/History' element={<HistoryTable />} />
            </Routes>

          </SnackbarProvider>

        </RainbowKitProvider>



      </WagmiConfig>



    </div >
  )
}

export default App

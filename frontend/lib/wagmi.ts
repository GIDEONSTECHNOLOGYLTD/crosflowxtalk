import { http, createConfig } from 'wagmi'
import { mainnet, bsc, polygon, arbitrum, optimism } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, bsc, polygon, arbitrum, optimism],
  connectors: [
    injected(), // MetaMask, Coinbase Wallet, etc.
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
      metadata: {
        name: 'CrossFlow Protocol',
        description: 'Cross-Chain DeFi Ecosystem on LayerOneX',
        url: 'https://crossflow.protocol',
        icons: ['https://crossflow.protocol/icon.png']
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
})

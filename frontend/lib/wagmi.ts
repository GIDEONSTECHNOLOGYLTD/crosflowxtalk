import { http, createConfig } from 'wagmi'
import { mainnet, bsc, polygon, arbitrum, optimism } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, bsc, polygon, arbitrum, optimism],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
})

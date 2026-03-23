"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

interface WalletContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  disconnect: () => void;
  balance: string;
  chainId: number | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    if (isConnected && address) {
      // Fetch balance when connected
      // This would be replaced with actual balance fetching
      setBalance("10.5");
    } else {
      setBalance("0.00");
    }
  }, [isConnected, address]);

  const handleConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  const value: WalletContextType = {
    address,
    isConnected,
    isConnecting: isPending,
    connect: handleConnect,
    disconnect,
    balance,
    chainId: chain?.id,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

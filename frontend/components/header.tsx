"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Menu } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet-context";

export function Header() {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="text-xl font-bold">CrossFlow</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/swap" className="text-sm font-medium hover:text-primary transition-colors">
                Swap
              </Link>
              <Link href="/pools" className="text-sm font-medium hover:text-primary transition-colors">
                Pools
              </Link>
              <Link href="/banking" className="text-sm font-medium hover:text-primary transition-colors">
                Banking
              </Link>
              <Link href="/portfolio" className="text-sm font-medium hover:text-primary transition-colors">
                Portfolio
              </Link>
              <Link href="/yield" className="text-sm font-medium hover:text-primary transition-colors">
                Yield
              </Link>
              <Link href="/stake" className="text-sm font-medium hover:text-primary transition-colors">
                Stake
              </Link>
              <Link href="/analytics" className="text-sm font-medium hover:text-primary transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isConnected && address ? (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => disconnect()}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {formatAddress(address)}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
                onClick={() => connect()}
                disabled={isConnecting}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

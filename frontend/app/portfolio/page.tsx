"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Wallet, RefreshCw } from "lucide-react";

export default function PortfolioPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const portfolioData = {
    totalValue: "$125,432.50",
    change24h: "+$5,234.12",
    changePercent: "+4.35%",
    chains: [
      { name: "Ethereum", value: "$45,230.00", tokens: 5, color: "bg-blue-500" },
      { name: "BSC", value: "$28,450.00", tokens: 8, color: "bg-yellow-500" },
      { name: "Polygon", value: "$22,100.00", tokens: 6, color: "bg-purple-500" },
      { name: "Solana", value: "$15,320.00", tokens: 4, color: "bg-green-500" },
      { name: "Arbitrum", value: "$8,932.50", tokens: 3, color: "bg-blue-400" },
      { name: "Optimism", value: "$5,400.00", tokens: 2, color: "bg-red-500" },
    ],
    assets: [
      { symbol: "ETH", name: "Ethereum", chain: "Ethereum", balance: "12.5", value: "$31,250", change: "+5.2%", positive: true },
      { symbol: "BNB", name: "Binance Coin", chain: "BSC", balance: "45.2", value: "$18,080", change: "+3.1%", positive: true },
      { symbol: "MATIC", name: "Polygon", chain: "Polygon", balance: "15,000", value: "$13,500", change: "-1.2%", positive: false },
      { symbol: "SOL", name: "Solana", chain: "Solana", balance: "85.3", value: "$8,530", change: "+8.4%", positive: true },
      { symbol: "USDC", name: "USD Coin", chain: "Ethereum", balance: "25,000", value: "$25,000", change: "0.0%", positive: true },
      { symbol: "USDT", name: "Tether", chain: "BSC", balance: "$12,500", value: "$12,500", change: "0.0%", positive: true },
    ],
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
            <p className="text-muted-foreground">Track all your assets across 8+ chains</p>
          </div>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
            </div>
            <div className="text-3xl font-bold">{portfolioData.totalValue}</div>
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">{portfolioData.change24h} ({portfolioData.changePercent})</span>
            </div>
          </Card>

          <Card className="p-6">
            <span className="text-sm text-muted-foreground mb-2 block">Active Chains</span>
            <div className="text-3xl font-bold">{portfolioData.chains.length}</div>
            <div className="text-sm text-muted-foreground mt-2">Across {portfolioData.assets.length} assets</div>
          </Card>

          <Card className="p-6">
            <span className="text-sm text-muted-foreground mb-2 block">Best Performer (24h)</span>
            <div className="text-2xl font-bold">SOL</div>
            <div className="flex items-center gap-2 mt-2 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+8.4%</span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="chains">By Chain</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-4">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">All Assets</h2>
                <div className="space-y-4">
                  {portfolioData.assets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{asset.name}</div>
                          <div className="text-sm text-muted-foreground">{asset.chain}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{asset.value}</div>
                        <div className="text-sm text-muted-foreground">{asset.balance} {asset.symbol}</div>
                      </div>
                      <div className={`text-right ${asset.positive ? 'text-green-500' : 'text-red-500'}`}>
                        <div className="flex items-center gap-1">
                          {asset.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          <span className="font-semibold">{asset.change}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chains" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioData.chains.map((chain, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-3 w-3 rounded-full ${chain.color}`} />
                    <h3 className="font-semibold">{chain.name}</h3>
                  </div>
                  <div className="text-2xl font-bold mb-2">{chain.value}</div>
                  <div className="text-sm text-muted-foreground">{chain.tokens} tokens</div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Swap ETH → BNB</div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">-2.5 ETH</div>
                      <div className="text-sm text-green-500">+12.3 BNB</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Stake CFLOW</div>
                      <div className="text-sm text-muted-foreground">1 day ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">+5,000 CFLOW</div>
                      <div className="text-sm text-muted-foreground">Staked</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

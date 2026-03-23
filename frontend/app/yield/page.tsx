"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Zap, DollarSign, RefreshCw } from "lucide-react";

export default function YieldPage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedVault, setSelectedVault] = useState<number | null>(null);

  const vaults = [
    {
      name: "Stable Vault",
      apy: "12.5%",
      tvl: "$45.2M",
      tokens: ["USDC", "USDT", "DAI"],
      risk: "Low",
      autoCompound: true,
      chains: ["Ethereum", "BSC", "Polygon"],
    },
    {
      name: "ETH Maximizer",
      apy: "18.3%",
      tvl: "$28.5M",
      tokens: ["ETH", "WETH"],
      risk: "Medium",
      autoCompound: true,
      chains: ["Ethereum", "Arbitrum", "Optimism"],
    },
    {
      name: "Multi-Chain DeFi",
      apy: "25.7%",
      tvl: "$15.8M",
      tokens: ["Various"],
      risk: "Medium",
      autoCompound: true,
      chains: ["All Chains"],
    },
    {
      name: "High Yield",
      apy: "42.1%",
      tvl: "$8.2M",
      tokens: ["Various"],
      risk: "High",
      autoCompound: true,
      chains: ["BSC", "Polygon"],
    },
  ];

  const myPositions = [
    { vault: "Stable Vault", deposited: "$10,000", earned: "$125.50", apy: "12.5%" },
    { vault: "ETH Maximizer", deposited: "$5,000", earned: "$91.50", apy: "18.3%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Yield Optimizer</h1>
          <p className="text-muted-foreground">Auto-compound and maximize your returns across chains</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Deposited</span>
            </div>
            <div className="text-3xl font-bold">$15,000</div>
            <div className="text-sm text-muted-foreground mt-2">Across 2 vaults</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Earned</span>
            </div>
            <div className="text-3xl font-bold text-green-500">$217.00</div>
            <div className="text-sm text-muted-foreground mt-2">+1.45% overall</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Average APY</span>
            </div>
            <div className="text-3xl font-bold">14.8%</div>
            <div className="text-sm text-muted-foreground mt-2">Auto-compounding</div>
          </Card>
        </div>

        <Tabs defaultValue="vaults" className="space-y-6">
          <TabsList>
            <TabsTrigger value="vaults">All Vaults</TabsTrigger>
            <TabsTrigger value="positions">My Positions</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="vaults" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vaults.map((vault, index) => (
                <Card 
                  key={index} 
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedVault === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedVault(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{vault.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          vault.risk === 'Low' ? 'bg-green-500/10 text-green-500' :
                          vault.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {vault.risk} Risk
                        </span>
                        {vault.autoCompound && (
                          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                            Auto-Compound
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">{vault.apy}</div>
                      <div className="text-xs text-muted-foreground">APY</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">TVL</span>
                      <span className="font-medium">{vault.tvl}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Assets</span>
                      <span className="font-medium">{vault.tokens.join(", ")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Chains</span>
                      <span className="font-medium">{vault.chains.join(", ")}</span>
                    </div>
                  </div>

                  {selectedVault === index && (
                    <div className="space-y-3 pt-4 border-t">
                      <Input
                        type="number"
                        placeholder="Amount to deposit"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                      <Button className="w-full">
                        Deposit & Start Earning
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positions">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Active Positions</h2>
              <div className="space-y-4">
                {myPositions.map((position, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{position.vault}</h3>
                      <span className="text-sm text-green-500 font-medium">{position.apy} APY</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Deposited</div>
                        <div className="font-semibold">{position.deposited}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Earned</div>
                        <div className="font-semibold text-green-500">{position.earned}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        Withdraw
                      </Button>
                      <Button size="sm" className="flex-1">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Compound
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Deposited to Stable Vault</div>
                      <div className="text-sm text-muted-foreground">2 days ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">+$10,000</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">Auto-Compound ETH Maximizer</div>
                      <div className="text-sm text-muted-foreground">1 day ago</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-500">+$45.50</div>
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

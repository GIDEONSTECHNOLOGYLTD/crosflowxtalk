"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet, TrendingUp, Plus } from "lucide-react";

export default function PoolsPage() {
  const [depositAmount, setDepositAmount] = useState("");

  const pools = [
    {
      pair: "ETH/USDC",
      chain: "Ethereum",
      tvl: "$45.2M",
      apy: "18.5%",
      volume24h: "$12.3M",
      yourLiquidity: "$0",
    },
    {
      pair: "BNB/BUSD",
      chain: "BSC",
      tvl: "$28.5M",
      apy: "22.3%",
      volume24h: "$8.5M",
      yourLiquidity: "$0",
    },
    {
      pair: "MATIC/USDT",
      chain: "Polygon",
      tvl: "$15.8M",
      apy: "15.7%",
      volume24h: "$5.2M",
      yourLiquidity: "$0",
    },
    {
      pair: "SOL/USDC",
      chain: "Solana",
      tvl: "$12.3M",
      apy: "25.1%",
      volume24h: "$4.8M",
      yourLiquidity: "$0",
    },
  ];

  const myPositions = [
    { pair: "ETH/USDC", liquidity: "$5,000", earned: "$125.50", apy: "18.5%" },
    { pair: "BNB/BUSD", liquidity: "$3,000", earned: "$82.30", apy: "22.3%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Liquidity Pools</h1>
          <p className="text-muted-foreground">Provide liquidity and earn fees from swaps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Liquidity</span>
            </div>
            <div className="text-3xl font-bold">$101.8M</div>
            <div className="text-sm text-green-500 mt-1">+12.5% this week</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">24h Volume</span>
            </div>
            <div className="text-3xl font-bold">$30.8M</div>
            <div className="text-sm text-green-500 mt-1">+8.3% from yesterday</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Your Liquidity</span>
            </div>
            <div className="text-3xl font-bold">$8,000</div>
            <div className="text-sm text-green-500 mt-1">+$207.80 earned</div>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Pools</TabsTrigger>
            <TabsTrigger value="positions">My Positions</TabsTrigger>
            <TabsTrigger value="create">Create Pool</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {pools.map((pool, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{pool.pair}</h3>
                      <span className="text-sm text-muted-foreground">{pool.chain}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">{pool.apy}</div>
                      <div className="text-xs text-muted-foreground">APY</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">TVL</div>
                      <div className="font-semibold">{pool.tvl}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">24h Volume</div>
                      <div className="font-semibold">{pool.volume24h}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Your Liquidity</div>
                      <div className="font-semibold">{pool.yourLiquidity}</div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Liquidity
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positions">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Your Liquidity Positions</h2>
              <div className="space-y-4">
                {myPositions.map((position, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{position.pair}</h3>
                      <span className="text-sm text-green-500 font-medium">{position.apy} APY</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Your Liquidity</div>
                        <div className="font-semibold">{position.liquidity}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Earned Fees</div>
                        <div className="font-semibold text-green-500">{position.earned}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Remove
                      </Button>
                      <Button size="sm" className="flex-1">
                        Add More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Create New Pool</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Token Pair</label>
                  <div className="grid grid-cols-2 gap-4">
                    <select className="px-3 py-2 rounded-lg bg-secondary">
                      <option>ETH</option>
                      <option>BNB</option>
                      <option>MATIC</option>
                      <option>SOL</option>
                    </select>
                    <select className="px-3 py-2 rounded-lg bg-secondary">
                      <option>USDC</option>
                      <option>USDT</option>
                      <option>DAI</option>
                      <option>BUSD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Initial Liquidity</label>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Fee Tier</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["0.05%", "0.3%", "1.0%"].map((fee) => (
                      <button
                        key={fee}
                        className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
                      >
                        <div className="font-semibold">{fee}</div>
                        <div className="text-xs text-muted-foreground">Fee</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Create Pool
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

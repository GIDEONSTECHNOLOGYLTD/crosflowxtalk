"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { SwapInterface } from "@/components/swap-interface";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, History, Settings } from "lucide-react";

export default function SwapPage() {
  const recentSwaps = [
    { from: "2.5 ETH", to: "12.3 BNB", time: "2 hours ago", status: "Completed" },
    { from: "1000 USDC", to: "0.4 ETH", time: "5 hours ago", status: "Completed" },
    { from: "50 MATIC", to: "45 BNB", time: "1 day ago", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Swap</h1>
          <p className="text-muted-foreground">Trade tokens across 8+ chains with zero bridge risk</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SwapInterface />

            <Card className="p-6 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Why CrossFlow?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-semibold mb-1">No Bridge Risk</div>
                  <div className="text-sm text-muted-foreground">X-Talk eliminates $2.66B in bridge hacks</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-semibold mb-1">Best Rates</div>
                  <div className="text-sm text-muted-foreground">AI-powered routing across 50+ DEXs</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="font-semibold mb-1">Lightning Fast</div>
                  <div className="text-sm text-muted-foreground">~30 second cross-chain swaps</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Recent Swaps</h3>
              </div>
              <div className="space-y-3">
                {recentSwaps.map((swap, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{swap.from}</span>
                      <span className="text-xs text-muted-foreground">→</span>
                      <span className="text-sm font-medium text-green-500">{swap.to}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{swap.time}</span>
                      <span className="text-xs text-green-500">{swap.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Swap Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Slippage Tolerance</label>
                  <div className="flex gap-2">
                    {["0.1%", "0.5%", "1.0%"].map((value) => (
                      <button
                        key={value}
                        className="flex-1 px-3 py-2 rounded-lg bg-secondary hover:bg-primary/20 text-sm transition-colors"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Transaction Speed</label>
                  <select className="w-full px-3 py-2 rounded-lg bg-secondary">
                    <option>Standard</option>
                    <option>Fast</option>
                    <option>Instant</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

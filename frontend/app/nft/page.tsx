"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Image as ImageIcon, Zap } from "lucide-react";

export default function NFTBridgePage() {
  const [fromChain, setFromChain] = useState("ethereum");
  const [toChain, setToChain] = useState("polygon");
  const [nftAddress, setNftAddress] = useState("");
  const [tokenId, setTokenId] = useState("");

  const chains = [
    { id: "ethereum", name: "Ethereum" },
    { id: "bsc", name: "BSC" },
    { id: "polygon", name: "Polygon" },
    { id: "arbitrum", name: "Arbitrum" },
    { id: "optimism", name: "Optimism" },
  ];

  const recentBridges = [
    { nft: "Bored Ape #1234", from: "Ethereum", to: "Polygon", time: "2 hours ago", status: "Completed" },
    { nft: "CryptoPunk #5678", from: "Polygon", to: "BSC", time: "5 hours ago", status: "Completed" },
    { nft: "Azuki #9012", from: "BSC", to: "Ethereum", time: "1 day ago", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">NFT Bridge</h1>
          <p className="text-muted-foreground">Transfer NFTs across chains using X-Talk</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Bridgeless NFT Transfer</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">NFT Contract Address</label>
                  <Input
                    placeholder="0x..."
                    value={nftAddress}
                    onChange={(e) => setNftAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Token ID</label>
                  <Input
                    placeholder="1234"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">From Chain</label>
                    <Select value={fromChain} onValueChange={setFromChain}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            {chain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">To Chain</label>
                    <Select value={toChain} onValueChange={setToChain}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            {chain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">No Wrapped NFTs</h3>
                      <p className="text-sm text-muted-foreground">
                        X-Talk enables native NFT transfers without wrapping or locking. Your NFT remains authentic across all chains.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bridge Fee</span>
                    <span className="font-medium">0.1%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span className="font-medium">~30 seconds</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Security</span>
                    <span className="font-medium text-green-500">No Bridge Risk</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Transfer NFT
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <div className="font-medium">Connect Wallet</div>
                    <div className="text-sm text-muted-foreground">Connect your wallet containing the NFT</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <div className="font-medium">Select NFT</div>
                    <div className="text-sm text-muted-foreground">Enter contract address and token ID</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <div className="font-medium">Choose Destination</div>
                    <div className="text-sm text-muted-foreground">Select target blockchain</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <div className="font-medium">Transfer</div>
                    <div className="text-sm text-muted-foreground">X-Talk handles the rest securely</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Bridges</h3>
              <div className="space-y-3">
                {recentBridges.map((bridge, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/50">
                    <div className="font-medium text-sm mb-1">{bridge.nft}</div>
                    <div className="text-xs text-muted-foreground">
                      {bridge.from} → {bridge.to}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{bridge.time}</span>
                      <span className="text-xs text-green-500">{bridge.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

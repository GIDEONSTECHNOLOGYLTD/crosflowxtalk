"use client";

import { Card } from "@/components/ui/card";
import { Shield, Zap, TrendingUp, Globe, Lock, Coins } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "No Bridge Risks",
      description: "X-Talk eliminates $2.66B in bridge vulnerabilities with native cross-chain communication.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute cross-chain swaps in seconds, not minutes. No waiting for bridge confirmations.",
    },
    {
      icon: TrendingUp,
      title: "Best Rates",
      description: "AI-powered routing finds the best prices across 8+ chains and 50+ DEXs automatically.",
    },
    {
      icon: Globe,
      title: "8+ Chains",
      description: "Access Ethereum, BSC, Polygon, Solana, Arbitrum, Optimism, Fantom, and Avalanche.",
    },
    {
      icon: Lock,
      title: "Fully Audited",
      description: "Smart contracts audited by top security firms. $10M bug bounty program active.",
    },
    {
      icon: Coins,
      title: "Earn Rewards",
      description: "Stake $CFLOW tokens to earn protocol fees and governance rights.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose CrossFlow?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The most advanced cross-chain DeFi protocol built on LayerOneX
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <feature.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

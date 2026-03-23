"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Zap className="h-4 w-4" />
          Powered by LayerOneX X-Talk
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
          Cross-Chain DeFi
          <span className="text-primary"> Without Bridges</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Trade, lend, and earn across 8+ blockchains with native interoperability. 
          No wrapped tokens. No bridge risks. Just pure DeFi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/swap">
            <Button size="lg" className="text-lg px-8">
              Launch App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">$2.5B+</div>
            <div className="text-sm text-muted-foreground">Total Volume</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">8+</div>
            <div className="text-sm text-muted-foreground">Chains</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Users</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Bridge Hacks</div>
          </div>
        </div>
      </div>
    </section>
  );
}

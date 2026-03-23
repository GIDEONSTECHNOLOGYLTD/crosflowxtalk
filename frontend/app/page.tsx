"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { SwapInterface } from "@/components/swap-interface";
import { Features } from "@/components/features";
import { Chains } from "@/components/chains";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main>
        <Hero />
        <Stats />
        <div className="container mx-auto px-4 py-12">
          <SwapInterface />
        </div>
        <Features />
        <Chains />
      </main>
      <Footer />
    </div>
  );
}

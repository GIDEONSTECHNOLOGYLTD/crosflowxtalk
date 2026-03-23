"use client";

import Link from "next/link";
import { Twitter, Github, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="text-xl font-bold">CrossFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Bridgeless cross-chain DeFi powered by LayerOneX X-Talk
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/swap" className="hover:text-primary">Swap</Link></li>
              <li><Link href="/pools" className="hover:text-primary">Pools</Link></li>
              <li><Link href="/yield" className="hover:text-primary">Yield</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary">Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Developers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-primary">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-primary">API</Link></li>
              <li><Link href="/github" className="hover:text-primary">GitHub</Link></li>
              <li><Link href="/audits" className="hover:text-primary">Audits</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex gap-4">
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://discord.com" className="text-muted-foreground hover:text-primary">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 CrossFlow Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

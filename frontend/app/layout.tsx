import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrossFlow Protocol - Cross-Chain DeFi Ecosystem",
  description: "Bridgeless cross-chain DeFi powered by LayerOneX X-Talk",
  keywords: ["DeFi", "Cross-chain", "LayerOneX", "X-Talk", "Liquidity", "Yield"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

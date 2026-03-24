"use client";

import { useState, useEffect } from "react";
import { swapService, SwapQuote } from "@/lib/swap-service";
import { validateAmount, formatCurrency } from "@/lib/validation";
import { TransactionModal } from "@/components/transaction-modal";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, Settings } from "lucide-react";

const CHAINS = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "bsc", name: "BSC", symbol: "BNB" },
  { id: "polygon", name: "Polygon", symbol: "MATIC" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ETH" },
  { id: "optimism", name: "Optimism", symbol: "ETH" },
];

export function SwapInterface() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromChain, setFromChain] = useState("ethereum");
  const [toChain, setToChain] = useState("bsc");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("BNB");
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => setIsConnected(accounts.length > 0))
        .catch(() => setIsConnected(false));
    }
  }, []);

  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      fetchQuote();
    } else {
      setToAmount("");
      setQuote(null);
    }
  }, [fromAmount, fromToken, toToken, fromChain, toChain]);

  const fetchQuote = async () => {
    setIsLoadingQuote(true);
    try {
      const q = await swapService.getQuote(
        fromToken,
        toToken,
        fromChain,
        toChain,
        parseFloat(fromAmount)
      );
      setQuote(q);
      setToAmount(q.toAmount.toFixed(6));
    } catch (err) {
      console.error("Failed to fetch quote", err);
    } finally {
      setIsLoadingQuote(false);
    }
  };

  const handleSwap = async () => {
    if (!isConnected) {
      toast({ title: "Wallet Not Connected", description: "Please connect your wallet first", variant: "destructive" });
      return;
    }

    const validation = validateAmount(fromAmount);
    if (!validation.isValid) {
      setError(validation.error!);
      return;
    }

    if (!quote) {
      toast({ title: "No Quote", description: "Please wait for quote to load", variant: "destructive" });
      return;
    }

    setError("");
    setModalOpen(true);
  };

  const executeSwap = async () => {
    if (!quote) return;
    
    try {
      await swapService.executeSwap(quote);
      toast({ title: "Swap Successful!", description: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}` });
      setFromAmount("");
      setToAmount("");
      setQuote(null);
    } catch (err) {
      throw new Error("Swap failed. Please try again.");
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Swap</h2>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="bg-secondary rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-sm text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="text-2xl border-0 bg-transparent p-0 h-auto"
            />
            <Select value={fromChain} onValueChange={setFromChain}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CHAINS.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-secondary rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">To</span>
            <span className="text-sm text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="text-2xl border-0 bg-transparent p-0 h-auto"
            />
            <Select value={toChain} onValueChange={setToChain}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CHAINS.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Rate</span>
          <span>{isLoadingQuote ? "Loading..." : quote ? `1 ${fromToken} = ${quote.rate.toFixed(4)} ${toToken}` : "-"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Protocol Fee</span>
          <span>{quote ? formatCurrency(quote.fee) : "0.15%"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Route</span>
          <span className="text-primary">{quote?.route.join(" → ") || "X-Talk Direct"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Time</span>
          <span>{quote ? `~${quote.estimatedTime}s` : "~30s"}</span>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <Button 
        className="w-full mt-6" 
        size="lg"
        onClick={handleSwap}
        disabled={!fromAmount || !toAmount || isLoadingQuote || !isConnected}
      >
        {!isConnected ? "Connect Wallet" : isLoadingQuote ? "Loading Quote..." : "Swap Tokens"}
      </Button>

      {quote && (
        <TransactionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={executeSwap}
          title="Confirm Swap"
          description={`Swap ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`}
          amount={`${fromAmount} ${fromToken}`}
          fee={formatCurrency(quote.fee)}
        />
      )}
    </Card>
  );
}

"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Code, Zap, Shield, ExternalLink } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground">Complete guide to building on CrossFlow Protocol</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-4">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Book className="mr-2 h-4 w-4" />
                  Getting Started
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Code className="mr-2 h-4 w-4" />
                  API Reference
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Zap className="mr-2 h-4 w-4" />
                  Smart Contracts
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="quickstart" className="space-y-6">
              <TabsList>
                <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>

              <TabsContent value="quickstart">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Getting Started with CrossFlow</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Installation</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <div>npm install @crossflow/sdk</div>
                        <div className="mt-2"># or</div>
                        <div>yarn add @crossflow/sdk</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Initialize SDK</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <pre>{`import { CrossFlowSDK } from '@crossflow/sdk';

const sdk = new CrossFlowSDK({
  network: 'mainnet', // or 'testnet'
  apiKey: 'your-api-key',
});`}</pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Execute Cross-Chain Swap</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <pre>{`const swap = await sdk.swap({
  fromChain: 'ethereum',
  toChain: 'bsc',
  fromToken: 'ETH',
  toToken: 'BNB',
  amount: '1.0',
  slippage: 0.5,
});

console.log('Swap executed:', swap.txHash);`}</pre>
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">X-Talk Powered</h4>
                          <p className="text-sm text-muted-foreground">
                            All swaps use LayerOneX X-Talk for bridgeless cross-chain transfers. No wrapped tokens, no bridge risks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="api">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">API Reference</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Base URL</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        https://api.crossflow.protocol/v1
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Authentication</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <pre>{`Authorization: Bearer YOUR_API_KEY`}</pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Endpoints</h3>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-mono">GET</span>
                            <span className="font-mono text-sm">/quote</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Get swap quote for cross-chain transaction</p>
                          <div className="bg-secondary rounded p-3 font-mono text-xs">
                            <div>Query Parameters:</div>
                            <div className="ml-4 mt-1">fromChain, toChain, fromToken, toToken, amount</div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs font-mono">POST</span>
                            <span className="font-mono text-sm">/swap</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Execute cross-chain swap</p>
                          <div className="bg-secondary rounded p-3 font-mono text-xs">
                            <div>Body:</div>
                            <div className="ml-4 mt-1">{'{ fromChain, toChain, fromToken, toToken, amount, slippage }'}</div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-mono">GET</span>
                            <span className="font-mono text-sm">/portfolio/:address</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Get portfolio across all chains</p>
                          <div className="bg-secondary rounded p-3 font-mono text-xs">
                            <div>Returns: Array of assets with balances and values</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="contracts">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Smart Contracts</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Deployed Contracts</h3>
                      <div className="space-y-3">
                        {[
                          { name: "Liquidity Aggregator", address: "0x1234567890abcdef1234567890abcdef12345678" },
                          { name: "Governance Token (CFLOW)", address: "0x2345678901abcdef2345678901abcdef23456789" },
                          { name: "Yield Optimizer", address: "0x3456789012abcdef3456789012abcdef34567890" },
                          { name: "NFT Bridge", address: "0x4567890123abcdef4567890123abcdef45678901" },
                        ].map((contract, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                            <div>
                              <div className="font-semibold">{contract.name}</div>
                              <div className="font-mono text-sm text-muted-foreground">{contract.address}</div>
                            </div>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Contract Interfaces</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <pre>{`// Liquidity Aggregator Interface
interface ILiquidityAggregator {
    function swap(
        address fromToken,
        address toToken,
        uint256 amount,
        uint256 minOutput
    ) external returns (uint256);
    
    function getQuote(
        address fromToken,
        address toToken,
        uint256 amount
    ) external view returns (uint256);
}`}</pre>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="examples">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Cross-Chain Swap</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <pre>{`import { CrossFlowSDK } from '@crossflow/sdk';

async function swapEthToBnb() {
  const sdk = new CrossFlowSDK({ apiKey: 'YOUR_KEY' });
  
  const result = await sdk.swap({
    fromChain: 'ethereum',
    toChain: 'bsc',
    fromToken: 'ETH',
    toToken: 'BNB',
    amount: '1.0',
    slippage: 0.5,
  });
  
  console.log('Swap completed:', result);
}`}</pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Stake CFLOW Tokens</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <pre>{`async function stakeCFLOW() {
  const amount = ethers.utils.parseEther('1000');
  
  const tx = await governanceToken.stake(amount);
  await tx.wait();
  
  console.log('Staked 1000 CFLOW');
}`}</pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Bridge NFT</h3>
                      <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
                        <pre>{`async function bridgeNFT() {
  const result = await sdk.bridgeNFT({
    fromChain: 'ethereum',
    toChain: 'polygon',
    nftAddress: '0x...',
    tokenId: '1234',
  });
  
  console.log('NFT bridged:', result);
}`}</pre>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, TrendingUp, Lock, Gift } from "lucide-react";

export default function StakePage() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const stakingData = {
    totalStaked: "5,000,000",
    yourStake: "10,000",
    earned: "125.50",
    apy: "15.2%",
    lockPeriod: "30 days",
    nextReward: "2.5 CFLOW",
    timeToReward: "6 hours",
  };

  const stakingTiers = [
    { name: "Bronze", min: "1,000", apy: "12%", benefits: ["Basic rewards", "Voting rights"] },
    { name: "Silver", min: "10,000", apy: "15%", benefits: ["Enhanced rewards", "Priority support", "Voting rights"] },
    { name: "Gold", min: "50,000", apy: "18%", benefits: ["Premium rewards", "VIP support", "Governance power", "Fee discounts"] },
    { name: "Platinum", min: "100,000", apy: "22%", benefits: ["Maximum rewards", "Dedicated support", "Full governance", "Zero fees"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Stake $CFLOW</h1>
          <p className="text-muted-foreground">Earn rewards and governance rights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Your Stake</span>
            </div>
            <div className="text-2xl font-bold">{stakingData.yourStake}</div>
            <div className="text-sm text-muted-foreground mt-1">CFLOW</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Current APY</span>
            </div>
            <div className="text-2xl font-bold text-green-500">{stakingData.apy}</div>
            <div className="text-sm text-muted-foreground mt-1">Annual</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Earned</span>
            </div>
            <div className="text-2xl font-bold text-green-500">{stakingData.earned}</div>
            <div className="text-sm text-muted-foreground mt-1">CFLOW</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Lock Period</span>
            </div>
            <div className="text-2xl font-bold">{stakingData.lockPeriod}</div>
            <div className="text-sm text-muted-foreground mt-1">Minimum</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="stake" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stake">Stake</TabsTrigger>
                <TabsTrigger value="unstake">Unstake</TabsTrigger>
              </TabsList>

              <TabsContent value="stake">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Stake CFLOW Tokens</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount to Stake</label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="pr-20"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setStakeAmount("10000")}
                        >
                          MAX
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Available: 10,000 CFLOW
                      </div>
                    </div>

                    <div className="bg-primary/10 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Estimated APY</span>
                        <span className="font-semibold text-green-500">15.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Daily Rewards</span>
                        <span className="font-semibold">~4.17 CFLOW</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lock Period</span>
                        <span className="font-semibold">30 days</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      Stake CFLOW
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="unstake">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Unstake CFLOW Tokens</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount to Unstake</label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={unstakeAmount}
                          onChange={(e) => setUnstakeAmount(e.target.value)}
                          className="pr-20"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setUnstakeAmount(stakingData.yourStake)}
                        >
                          MAX
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Staked: {stakingData.yourStake} CFLOW
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-yellow-500 mb-1">Lock Period Active</h3>
                          <p className="text-sm text-muted-foreground">
                            Your tokens are locked for 15 more days. Early unstaking incurs a 5% penalty.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" variant="outline">
                      Unstake CFLOW
                    </Button>

                    <Button className="w-full" size="lg" variant="default">
                      <Gift className="mr-2 h-5 w-5" />
                      Claim Rewards ({stakingData.earned} CFLOW)
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Staking Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakingTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">{tier.name}</h3>
                      <span className="text-xl font-bold text-green-500">{tier.apy}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Minimum: {tier.min} CFLOW
                    </div>
                    <div className="space-y-1">
                      {tier.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Staking Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Staked</div>
                  <div className="text-2xl font-bold">{stakingData.totalStaked}</div>
                  <div className="text-sm text-muted-foreground">CFLOW</div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-1">Next Reward</div>
                  <div className="text-xl font-bold text-green-500">{stakingData.nextReward}</div>
                  <div className="text-sm text-muted-foreground">in {stakingData.timeToReward}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Coins className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Earn Rewards</div>
                    <div className="text-sm text-muted-foreground">Passive income from protocol fees</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Governance Rights</div>
                    <div className="text-sm text-muted-foreground">Vote on protocol decisions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Gift className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Fee Discounts</div>
                    <div className="text-sm text-muted-foreground">Reduced trading fees</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Staked</span>
                    <span className="font-medium">+10,000 CFLOW</span>
                  </div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
                <div className="text-sm pt-3 border-t">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Claimed</span>
                    <span className="font-medium text-green-500">+50 CFLOW</span>
                  </div>
                  <div className="text-xs text-muted-foreground">5 days ago</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

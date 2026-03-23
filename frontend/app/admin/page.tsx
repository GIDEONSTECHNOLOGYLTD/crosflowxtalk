"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, DollarSign, Shield, Users, Activity } from "lucide-react";

export default function AdminPage() {
  const [protocolFee, setProtocolFee] = useState("0.15");
  const [performanceFee, setPerformanceFee] = useState("15");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage protocol parameters and settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Protocol Revenue</span>
            </div>
            <div className="text-2xl font-bold">$1.2M</div>
            <div className="text-sm text-green-500 mt-1">+18.5% this month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Users</span>
            </div>
            <div className="text-2xl font-bold">52,341</div>
            <div className="text-sm text-green-500 mt-1">+15.2% growth</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Active Contracts</span>
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground mt-1">Deployed</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Security Status</span>
            </div>
            <div className="text-2xl font-bold text-green-500">Secure</div>
            <div className="text-sm text-muted-foreground mt-1">All systems operational</div>
          </Card>
        </div>

        <Tabs defaultValue="fees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="fees">Fee Management</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="fees">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Protocol Fees</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Swap Fee (%)</label>
                    <Input
                      type="number"
                      value={protocolFee}
                      onChange={(e) => setProtocolFee(e.target.value)}
                      step="0.01"
                    />
                    <div className="text-sm text-muted-foreground mt-2">
                      Current: {protocolFee}% per transaction
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Performance Fee (%)</label>
                    <Input
                      type="number"
                      value={performanceFee}
                      onChange={(e) => setPerformanceFee(e.target.value)}
                      step="1"
                    />
                    <div className="text-sm text-muted-foreground mt-2">
                      Current: {performanceFee}% of yield generated
                    </div>
                  </div>

                  <Button className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Update Fee Parameters
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Fee Distribution</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-secondary/50">
                    <div>
                      <div className="font-medium">Treasury</div>
                      <div className="text-sm text-muted-foreground">Protocol development</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">40%</div>
                      <div className="text-sm text-muted-foreground">$480K</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 rounded-lg bg-secondary/50">
                    <div>
                      <div className="font-medium">Stakers</div>
                      <div className="text-sm text-muted-foreground">CFLOW holders</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">40%</div>
                      <div className="text-sm text-muted-foreground">$480K</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 rounded-lg bg-secondary/50">
                    <div>
                      <div className="font-medium">Liquidity Providers</div>
                      <div className="text-sm text-muted-foreground">LP rewards</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">20%</div>
                      <div className="text-sm text-muted-foreground">$240K</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Deployed Contracts</h2>
              <div className="space-y-4">
                {[
                  { name: "Liquidity Aggregator", address: "0x1234...5678", status: "Active", version: "v1.2.0" },
                  { name: "Governance Token", address: "0x2345...6789", status: "Active", version: "v1.1.0" },
                  { name: "Yield Optimizer", address: "0x3456...7890", status: "Active", version: "v1.0.5" },
                  { name: "NFT Bridge", address: "0x4567...8901", status: "Active", version: "v1.0.2" },
                ].map((contract, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{contract.name}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-500">
                        {contract.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {contract.address}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{contract.version}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Upgrade</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">User Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm text-muted-foreground mb-1">New Users (30d)</div>
                  <div className="text-2xl font-bold">12,450</div>
                  <div className="text-sm text-green-500 mt-1">+22.5%</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm text-muted-foreground mb-1">Active Users (7d)</div>
                  <div className="text-2xl font-bold">8,234</div>
                  <div className="text-sm text-green-500 mt-1">+15.8%</div>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="text-sm text-muted-foreground mb-1">Avg. Transaction</div>
                  <div className="text-2xl font-bold">$2,450</div>
                  <div className="text-sm text-green-500 mt-1">+8.2%</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Revenue Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Swap Fees</span>
                    <span className="font-semibold">$720K (60%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Performance Fees</span>
                    <span className="font-semibold">$360K (30%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">NFT Bridge Fees</span>
                    <span className="font-semibold">$120K (10%)</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Chain Distribution</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ethereum</span>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">BSC</span>
                    <span className="font-semibold">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Polygon</span>
                    <span className="font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Others</span>
                    <span className="font-semibold">25%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

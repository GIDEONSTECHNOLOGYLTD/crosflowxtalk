"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

export default function AnalyticsPage() {
  const volumeData = [
    { date: "Jan 1", volume: 12000000 },
    { date: "Jan 8", volume: 18000000 },
    { date: "Jan 15", volume: 25000000 },
    { date: "Jan 22", volume: 32000000 },
    { date: "Jan 29", volume: 45000000 },
    { date: "Feb 5", volume: 52000000 },
    { date: "Feb 12", volume: 48000000 },
  ];

  const tvlData = [
    { date: "Jan 1", tvl: 45000000 },
    { date: "Jan 8", tvl: 62000000 },
    { date: "Jan 15", tvl: 78000000 },
    { date: "Jan 22", tvl: 95000000 },
    { date: "Jan 29", tvl: 110000000 },
    { date: "Feb 5", tvl: 125000000 },
    { date: "Feb 12", tvl: 125500000 },
  ];

  const userGrowthData = [
    { date: "Jan", users: 5000 },
    { date: "Feb", users: 12000 },
    { date: "Mar", users: 25000 },
    { date: "Apr", users: 38000 },
    { date: "May", users: 52000 },
  ];

  const chainDistribution = [
    { name: "Ethereum", value: 35, color: "#627EEA" },
    { name: "BSC", value: 22, color: "#F3BA2F" },
    { name: "Polygon", value: 18, color: "#8247E5" },
    { name: "Solana", value: 12, color: "#14F195" },
    { name: "Others", value: 13, color: "#6B7280" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Real-time protocol metrics and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Volume (24h)</span>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">$48.2M</div>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+12.5%</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Value Locked</span>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">$125.5M</div>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+8.3%</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">52,341</div>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+15.2%</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Transactions</span>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">1.2M</div>
            <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+22.1%</span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="volume" className="space-y-6">
          <TabsList>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="tvl">TVL</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="chains">Chains</TabsTrigger>
          </TabsList>

          <TabsContent value="volume">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Trading Volume (7 Days)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={volumeData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${value / 1000000}M`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, 'Volume']}
                  />
                  <Area type="monotone" dataKey="volume" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorVolume)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="tvl">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Total Value Locked (7 Days)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={tvlData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `$${value / 1000000}M`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, 'TVL']}
                  />
                  <Line type="monotone" dataKey="tvl" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">User Growth</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${(value / 1000).toFixed(1)}K`, 'Users']}
                  />
                  <Bar dataKey="users" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="chains">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Volume by Chain</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chainDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chainDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Chain Statistics</h2>
                <div className="space-y-4">
                  {chainDistribution.map((chain, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: chain.color }} />
                        <span className="font-medium">{chain.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{chain.value}%</div>
                        <div className="text-sm text-muted-foreground">${(125.5 * chain.value / 100).toFixed(1)}M</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

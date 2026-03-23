"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Lock } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Value Locked",
      value: "$125.5M",
      change: "+12.5%",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "24h Volume",
      value: "$45.2M",
      change: "+8.3%",
      positive: true,
    },
    {
      icon: Users,
      label: "Active Users",
      value: "52,341",
      change: "+15.2%",
      positive: true,
    },
    {
      icon: Lock,
      label: "Security Score",
      value: "100%",
      change: "Audited",
      positive: true,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

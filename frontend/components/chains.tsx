"use client";

export function Chains() {
  const chains = [
    { name: "Ethereum", color: "bg-blue-500" },
    { name: "BSC", color: "bg-yellow-500" },
    { name: "Polygon", color: "bg-purple-500" },
    { name: "Solana", color: "bg-green-500" },
    { name: "Arbitrum", color: "bg-blue-400" },
    { name: "Optimism", color: "bg-red-500" },
    { name: "Fantom", color: "bg-blue-600" },
    { name: "Avalanche", color: "bg-red-600" },
  ];

  return (
    <section className="container mx-auto px-4 py-20 bg-secondary/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Supported Chains
        </h2>
        <p className="text-lg text-muted-foreground">
          Access 80%+ of blockchain TVL from one platform
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {chains.map((chain, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-background rounded-lg px-6 py-3 border hover:shadow-md transition-shadow"
          >
            <div className={`h-3 w-3 rounded-full ${chain.color}`} />
            <span className="font-medium">{chain.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

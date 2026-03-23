// Complete Yield Optimizer Service

export interface YieldVault {
  id: string;
  name: string;
  apy: number;
  tvl: number;
  tokens: string[];
  risk: "Low" | "Medium" | "High";
  autoCompound: boolean;
  chains: string[];
  strategy: string;
}

export interface YieldPosition {
  id: string;
  vaultId: string;
  vaultName: string;
  deposited: number;
  earned: number;
  apy: number;
  depositedAt: Date;
}

class YieldService {
  private vaults: YieldVault[] = [];
  private positions: YieldPosition[] = [];

  constructor() {
    this.loadFromStorage();
    if (this.vaults.length === 0) {
      this.initializeVaults();
    }
  }

  private initializeVaults() {
    this.vaults = [
      {
        id: "vault-1",
        name: "Stable Vault",
        apy: 12.5,
        tvl: 45200000,
        tokens: ["USDC", "USDT", "DAI"],
        risk: "Low",
        autoCompound: true,
        chains: ["Ethereum", "BSC", "Polygon"],
        strategy: "Stable coin farming across multiple chains",
      },
      {
        id: "vault-2",
        name: "ETH Maximizer",
        apy: 18.3,
        tvl: 28500000,
        tokens: ["ETH", "WETH"],
        risk: "Medium",
        autoCompound: true,
        chains: ["Ethereum", "Arbitrum", "Optimism"],
        strategy: "ETH staking and DeFi yield",
      },
      {
        id: "vault-3",
        name: "Multi-Chain DeFi",
        apy: 25.7,
        tvl: 15800000,
        tokens: ["Various"],
        risk: "Medium",
        autoCompound: true,
        chains: ["All Chains"],
        strategy: "Diversified DeFi protocols",
      },
      {
        id: "vault-4",
        name: "High Yield",
        apy: 42.1,
        tvl: 8200000,
        tokens: ["Various"],
        risk: "High",
        autoCompound: true,
        chains: ["BSC", "Polygon"],
        strategy: "High-risk, high-reward strategies",
      },
    ];
    this.saveToStorage();
  }

  private loadFromStorage() {
    if (typeof window !== "undefined") {
      const vaultsData = localStorage.getItem("yield_vaults");
      const positionsData = localStorage.getItem("yield_positions");
      if (vaultsData) this.vaults = JSON.parse(vaultsData);
      if (positionsData) this.positions = JSON.parse(positionsData);
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem("yield_vaults", JSON.stringify(this.vaults));
      localStorage.setItem("yield_positions", JSON.stringify(this.positions));
    }
  }

  getVaults(): YieldVault[] {
    return this.vaults;
  }

  getVault(id: string): YieldVault | undefined {
    return this.vaults.find(v => v.id === id);
  }

  getPositions(): YieldPosition[] {
    return this.positions;
  }

  getTotalDeposited(): number {
    return this.positions.reduce((sum, pos) => sum + pos.deposited, 0);
  }

  getTotalEarned(): number {
    return this.positions.reduce((sum, pos) => sum + pos.earned, 0);
  }

  async deposit(vaultId: string, amount: number): Promise<YieldPosition> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const vault = this.getVault(vaultId);
    if (!vault) throw new Error("Vault not found");

    const existingPosition = this.positions.find(p => p.vaultId === vaultId);

    if (existingPosition) {
      existingPosition.deposited += amount;
      existingPosition.earned += amount * (vault.apy / 100) * 0.01; // Small initial earning
    } else {
      const position: YieldPosition = {
        id: `pos-${Date.now()}`,
        vaultId,
        vaultName: vault.name,
        deposited: amount,
        earned: 0,
        apy: vault.apy,
        depositedAt: new Date(),
      };
      this.positions.push(position);
    }

    vault.tvl += amount;
    this.saveToStorage();

    return this.positions.find(p => p.vaultId === vaultId)!;
  }

  async withdraw(vaultId: string, amount: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const position = this.positions.find(p => p.vaultId === vaultId);
    if (!position) throw new Error("No position found");
    if (position.deposited < amount) throw new Error("Insufficient balance");

    const vault = this.getVault(vaultId);
    if (!vault) throw new Error("Vault not found");

    position.deposited -= amount;
    vault.tvl -= amount;

    if (position.deposited === 0) {
      this.positions = this.positions.filter(p => p.id !== position.id);
    }

    this.saveToStorage();
  }

  async compound(vaultId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const position = this.positions.find(p => p.vaultId === vaultId);
    if (!position) throw new Error("No position found");

    position.deposited += position.earned;
    position.earned = 0;

    this.saveToStorage();
  }

  calculateProjectedEarnings(amount: number, apy: number, days: number): number {
    return amount * (apy / 100) * (days / 365);
  }
}

export const yieldService = new YieldService();

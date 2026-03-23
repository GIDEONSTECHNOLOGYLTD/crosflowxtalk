// Complete Staking Service for CFLOW tokens

export interface StakingTier {
  name: string;
  minAmount: number;
  apy: number;
  benefits: string[];
}

export interface StakePosition {
  id: string;
  amount: number;
  tier: string;
  apy: number;
  earned: number;
  stakedAt: Date;
  lockPeriod: number; // days
  unlockDate: Date;
}

class StakingService {
  private position: StakePosition | null = null;
  private totalStaked: number = 5000000;
  private rewardRate: number = 15.2;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("staking_position");
      if (data) {
        this.position = JSON.parse(data);
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      if (this.position) {
        localStorage.setItem("staking_position", JSON.stringify(this.position));
      } else {
        localStorage.removeItem("staking_position");
      }
    }
  }

  getTiers(): StakingTier[] {
    return [
      { 
        name: "Bronze", 
        minAmount: 1000, 
        apy: 12, 
        benefits: ["Basic rewards", "Voting rights"] 
      },
      { 
        name: "Silver", 
        minAmount: 10000, 
        apy: 15, 
        benefits: ["Enhanced rewards", "Priority support", "Voting rights"] 
      },
      { 
        name: "Gold", 
        minAmount: 50000, 
        apy: 18, 
        benefits: ["Premium rewards", "VIP support", "Governance power", "Fee discounts"] 
      },
      { 
        name: "Platinum", 
        minAmount: 100000, 
        apy: 22, 
        benefits: ["Maximum rewards", "Dedicated support", "Full governance", "Zero fees"] 
      },
    ];
  }

  getTierForAmount(amount: number): StakingTier {
    const tiers = this.getTiers();
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (amount >= tiers[i].minAmount) {
        return tiers[i];
      }
    }
    return tiers[0];
  }

  getPosition(): StakePosition | null {
    return this.position;
  }

  getTotalStaked(): number {
    return this.totalStaked;
  }

  async stake(amount: number, lockPeriod: number = 30): Promise<StakePosition> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const tier = this.getTierForAmount(amount);
    const now = new Date();
    const unlockDate = new Date(now.getTime() + lockPeriod * 24 * 60 * 60 * 1000);

    if (this.position) {
      this.position.amount += amount;
      const newTier = this.getTierForAmount(this.position.amount);
      this.position.tier = newTier.name;
      this.position.apy = newTier.apy;
    } else {
      this.position = {
        id: `stake-${Date.now()}`,
        amount,
        tier: tier.name,
        apy: tier.apy,
        earned: 0,
        stakedAt: now,
        lockPeriod,
        unlockDate,
      };
    }

    this.totalStaked += amount;
    this.saveToStorage();

    return this.position;
  }

  async unstake(amount: number): Promise<void> {
    if (!this.position) throw new Error("No stake found");
    if (this.position.amount < amount) throw new Error("Insufficient staked amount");

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if still locked
    const now = new Date();
    if (now < this.position.unlockDate) {
      // Apply 5% early unstaking penalty
      amount = amount * 0.95;
    }

    this.position.amount -= amount;
    this.totalStaked -= amount;

    if (this.position.amount === 0) {
      this.position = null;
    } else {
      const newTier = this.getTierForAmount(this.position.amount);
      this.position.tier = newTier.name;
      this.position.apy = newTier.apy;
    }

    this.saveToStorage();
  }

  async claimRewards(): Promise<number> {
    if (!this.position) throw new Error("No stake found");

    await new Promise(resolve => setTimeout(resolve, 1000));

    const rewards = this.position.earned;
    this.position.earned = 0;
    this.saveToStorage();

    return rewards;
  }

  calculateRewards(position: StakePosition): number {
    const now = new Date();
    const timeStaked = now.getTime() - position.stakedAt.getTime();
    const daysStaked = timeStaked / (1000 * 60 * 60 * 24);
    const yearlyReward = position.amount * (position.apy / 100);
    const currentReward = (yearlyReward / 365) * daysStaked;
    return currentReward;
  }

  getNextReward(): { amount: number; timeRemaining: string } {
    if (!this.position) return { amount: 0, timeRemaining: "N/A" };

    const dailyReward = (this.position.amount * (this.position.apy / 100)) / 365;
    
    return {
      amount: dailyReward,
      timeRemaining: "6 hours",
    };
  }

  isLocked(): boolean {
    if (!this.position) return false;
    return new Date() < this.position.unlockDate;
  }

  getDaysUntilUnlock(): number {
    if (!this.position) return 0;
    const now = new Date();
    const diff = this.position.unlockDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }
}

export const stakingService = new StakingService();

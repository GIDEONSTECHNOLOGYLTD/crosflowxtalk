use l1x_sdk::{contract, store::LookupMap};
use serde::{Deserialize, Serialize};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Debug)]
pub struct StakeInfo {
    pub amount: u128,
    pub staked_at: u64,
    pub rewards_claimed: u128,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct GovernanceToken {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: u128,
    pub balances: LookupMap<String, u128>,
    pub allowances: LookupMap<String, LookupMap<String, u128>>,
    pub stakes: LookupMap<String, StakeInfo>,
    pub total_staked: u128,
    pub reward_rate: u128,
}

#[contract]
impl GovernanceToken {
    pub fn new(name: String, symbol: String, decimals: u8, initial_supply: u128) -> Self {
        let mut token = Self {
            name,
            symbol,
            decimals,
            total_supply: initial_supply,
            balances: LookupMap::new(b"balances".to_vec()),
            allowances: LookupMap::new(b"allowances".to_vec()),
            stakes: LookupMap::new(b"stakes".to_vec()),
            total_staked: 0,
            reward_rate: 100,
        };

        let caller = l1x_sdk::caller_address();
        token.balances.insert(&caller, &initial_supply);

        token
    }

    pub fn balance_of(&self, account: String) -> u128 {
        self.balances.get(&account).unwrap_or(0)
    }

    pub fn transfer(&mut self, to: String, amount: u128) -> bool {
        let from = l1x_sdk::caller_address();
        let from_balance = self.balance_of(from.clone());
        
        assert!(from_balance >= amount, "Insufficient balance");

        self.balances.insert(&from, &(from_balance - amount));
        let to_balance = self.balance_of(to.clone());
        self.balances.insert(&to, &(to_balance + amount));

        true
    }

    pub fn approve(&mut self, spender: String, amount: u128) -> bool {
        let owner = l1x_sdk::caller_address();
        let mut owner_allowances = self.allowances.get(&owner).unwrap_or_else(|| {
            LookupMap::new(format!("allowances:{}", owner).into_bytes())
        });
        
        owner_allowances.insert(&spender, &amount);
        self.allowances.insert(&owner, &owner_allowances);

        true
    }

    pub fn stake(&mut self, amount: u128) {
        let caller = l1x_sdk::caller_address();
        let balance = self.balance_of(caller.clone());
        
        assert!(balance >= amount, "Insufficient balance to stake");

        self.balances.insert(&caller, &(balance - amount));
        
        let stake_info = StakeInfo {
            amount,
            staked_at: l1x_sdk::block_timestamp(),
            rewards_claimed: 0,
        };
        
        self.stakes.insert(&caller, &stake_info);
        self.total_staked += amount;
    }

    pub fn unstake(&mut self, amount: u128) {
        let caller = l1x_sdk::caller_address();
        let mut stake_info = self.stakes.get(&caller).expect("No stake found");
        
        assert!(stake_info.amount >= amount, "Insufficient staked amount");

        stake_info.amount -= amount;
        self.stakes.insert(&caller, &stake_info);
        self.total_staked -= amount;

        let balance = self.balance_of(caller.clone());
        self.balances.insert(&caller, &(balance + amount));
    }

    pub fn claim_rewards(&mut self) -> u128 {
        let caller = l1x_sdk::caller_address();
        let mut stake_info = self.stakes.get(&caller).expect("No stake found");
        
        let current_time = l1x_sdk::block_timestamp();
        let time_staked = current_time - stake_info.staked_at;
        let rewards = (stake_info.amount * self.reward_rate * time_staked as u128) / (365 * 24 * 60 * 60 * 10000);

        stake_info.rewards_claimed += rewards;
        stake_info.staked_at = current_time;
        self.stakes.insert(&caller, &stake_info);

        let balance = self.balance_of(caller.clone());
        self.balances.insert(&caller, &(balance + rewards));

        rewards
    }

    pub fn get_stake_info(&self, account: String) -> Option<StakeInfo> {
        self.stakes.get(&account)
    }

    pub fn total_supply(&self) -> u128 {
        self.total_supply
    }

    pub fn total_staked(&self) -> u128 {
        self.total_staked
    }
}

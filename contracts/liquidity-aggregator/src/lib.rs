use l1x_sdk::{contract, store::LookupMap};
use serde::{Deserialize, Serialize};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Debug)]
pub struct Pool {
    pub chain_id: u64,
    pub token_a: String,
    pub token_b: String,
    pub reserve_a: u128,
    pub reserve_b: u128,
    pub fee_rate: u16,
    pub dex_name: String,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, Debug)]
pub struct SwapRoute {
    pub pools: Vec<String>,
    pub expected_output: u128,
    pub price_impact: u16,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct LiquidityAggregator {
    pub owner: String,
    pub pools: LookupMap<String, Pool>,
    pub total_volume: u128,
    pub protocol_fee: u16,
    pub fee_collector: String,
}

#[contract]
impl LiquidityAggregator {
    pub fn new(owner: String, protocol_fee: u16, fee_collector: String) -> Self {
        Self {
            owner,
            pools: LookupMap::new(b"pools".to_vec()),
            total_volume: 0,
            protocol_fee,
            fee_collector,
        }
    }

    pub fn add_pool(
        &mut self,
        pool_id: String,
        chain_id: u64,
        token_a: String,
        token_b: String,
        reserve_a: u128,
        reserve_b: u128,
        fee_rate: u16,
        dex_name: String,
    ) {
        let caller = l1x_sdk::caller_address();
        assert_eq!(caller, self.owner, "Only owner can add pools");

        let pool = Pool {
            chain_id,
            token_a,
            token_b,
            reserve_a,
            reserve_b,
            fee_rate,
            dex_name,
        };

        self.pools.insert(&pool_id, &pool);
    }

    pub fn find_best_route(
        &self,
        token_in: String,
        token_out: String,
        amount_in: u128,
    ) -> SwapRoute {
        let mut best_route = SwapRoute {
            pools: vec![],
            expected_output: 0,
            price_impact: 0,
        };

        best_route
    }

    pub fn execute_swap(
        &mut self,
        route: SwapRoute,
        amount_in: u128,
        min_amount_out: u128,
        recipient: String,
    ) -> u128 {
        let protocol_fee_amount = (amount_in * self.protocol_fee as u128) / 10000;
        let swap_amount = amount_in - protocol_fee_amount;

        self.total_volume += amount_in;

        swap_amount
    }

    pub fn get_pool(&self, pool_id: String) -> Option<Pool> {
        self.pools.get(&pool_id)
    }

    pub fn get_total_volume(&self) -> u128 {
        self.total_volume
    }

    pub fn update_protocol_fee(&mut self, new_fee: u16) {
        let caller = l1x_sdk::caller_address();
        assert_eq!(caller, self.owner, "Only owner can update fee");
        assert!(new_fee <= 100, "Fee too high");
        self.protocol_fee = new_fee;
    }
}

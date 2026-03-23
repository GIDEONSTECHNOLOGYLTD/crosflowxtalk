"use client";

import { useState, useEffect } from "react";
import { bankingService } from "@/lib/banking-service";
import { validateAmount, validateAddress, formatCurrency } from "@/lib/validation";
import { TransactionModal } from "@/components/transaction-modal";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/loading-skeleton";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Send, Download, TrendingUp, CreditCard, Shield } from "lucide-react";

export default function BankingPage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("acc-1");
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState(bankingService.getAccounts());
  const [transactions, setTransactions] = useState(bankingService.getTransactions(10));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<any>(null);
  const [depositError, setDepositError] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [transferError, setTransferError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const refreshData = () => {
    setAccounts(bankingService.getAccounts());
    setTransactions(bankingService.getTransactions(10));
  };

  const handleDeposit = async () => {
    const validation = validateAmount(depositAmount);
    if (!validation.isValid) {
      setDepositError(validation.error!);
      return;
    }
    setDepositError("");

    setModalConfig({
      title: "Confirm Deposit",
      description: "Deposit funds into your account",
      amount: formatCurrency(parseFloat(depositAmount)),
      fee: "$0.00",
      onConfirm: async () => {
        await bankingService.deposit(selectedAccount, parseFloat(depositAmount), "crypto");
        refreshData();
        setDepositAmount("");
        toast({ title: "Deposit Successful", description: `Deposited ${formatCurrency(parseFloat(depositAmount))}` });
      },
    });
    setModalOpen(true);
  };

  const handleWithdraw = async () => {
    const account = accounts.find(a => a.id === selectedAccount);
    const validation = validateAmount(withdrawAmount, account?.balance.toString());
    if (!validation.isValid) {
      setWithdrawError(validation.error!);
      return;
    }
    setWithdrawError("");

    setModalConfig({
      title: "Confirm Withdrawal",
      description: "Withdraw funds from your account",
      amount: formatCurrency(parseFloat(withdrawAmount)),
      fee: "$0.00",
      onConfirm: async () => {
        await bankingService.withdraw(selectedAccount, parseFloat(withdrawAmount), "crypto");
        refreshData();
        setWithdrawAmount("");
        toast({ title: "Withdrawal Successful", description: `Withdrew ${formatCurrency(parseFloat(withdrawAmount))}` });
      },
    });
    setModalOpen(true);
  };

  const handleTransfer = async () => {
    const account = accounts.find(a => a.id === selectedAccount);
    const amountValidation = validateAmount(transferAmount, account?.balance.toString());
    const addressValidation = validateAddress(recipientAddress);
    
    if (!amountValidation.isValid) {
      setTransferError(amountValidation.error!);
      return;
    }
    if (!addressValidation.isValid) {
      setTransferError(addressValidation.error!);
      return;
    }
    setTransferError("");

    setModalConfig({
      title: "Confirm Transfer",
      description: `Transfer to ${recipientAddress.slice(0, 20)}...`,
      amount: formatCurrency(parseFloat(transferAmount)),
      fee: "$0.00",
      onConfirm: async () => {
        await bankingService.transfer(selectedAccount, recipientAddress, parseFloat(transferAmount));
        refreshData();
        setTransferAmount("");
        setRecipientAddress("");
        toast({ title: "Transfer Successful", description: `Sent ${formatCurrency(parseFloat(transferAmount))}` });
      },
    });
    setModalOpen(true);
  };

  const accounts = [
    { name: "Savings Account", balance: "$25,450.00", apy: "5.2%", type: "Savings" },
    { name: "Checking Account", balance: "$8,230.50", apy: "0.5%", type: "Checking" },
    { name: "Investment Account", balance: "$45,820.00", apy: "12.5%", type: "Investment" },
  ];

  const transactions = [
    { type: "Deposit", amount: "+$5,000", date: "2 hours ago", status: "Completed" },
    { type: "Withdrawal", amount: "-$1,200", date: "1 day ago", status: "Completed" },
    { type: "Transfer", amount: "-$500", date: "3 days ago", status: "Completed" },
    { type: "Interest", amount: "+$125.50", date: "1 week ago", status: "Completed" },
  ];

  const loanOffers = [
    { type: "Personal Loan", rate: "6.5%", maxAmount: "$50,000", term: "5 years" },
    { type: "Business Loan", rate: "5.2%", maxAmount: "$250,000", term: "10 years" },
    { type: "Crypto-Backed Loan", rate: "4.8%", maxAmount: "$100,000", term: "3 years" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">CrossFlow Banking</h1>
          <p className="text-muted-foreground">Decentralized banking with crypto and fiat integration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Balance</span>
            </div>
            <div className="text-3xl font-bold">$79,500.50</div>
            <div className="text-sm text-green-500 mt-1">+$2,450 this month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Interest Earned</span>
            </div>
            <div className="text-3xl font-bold text-green-500">$425.80</div>
            <div className="text-sm text-muted-foreground mt-1">This month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Available Credit</span>
            </div>
            <div className="text-3xl font-bold">$50,000</div>
            <div className="text-sm text-muted-foreground mt-1">Credit limit</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Insurance</span>
            </div>
            <div className="text-3xl font-bold text-green-500">Active</div>
            <div className="text-sm text-muted-foreground mt-1">FDIC Protected</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Your Accounts</h2>
              <div className="space-y-4">
                {accounts.map((account, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{account.name}</h3>
                        <span className="text-sm text-muted-foreground">{account.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{account.balance}</div>
                        <div className="text-sm text-green-500">{account.apy} APY</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Withdraw
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Send className="mr-2 h-4 w-4" />
                        Transfer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Tabs defaultValue="deposit" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                <TabsTrigger value="transfer">Transfer</TabsTrigger>
              </TabsList>

              <TabsContent value="deposit">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Deposit Funds</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Account</label>
                      <select className="w-full px-3 py-2 rounded-lg bg-secondary">
                        <option>Savings Account</option>
                        <option>Checking Account</option>
                        <option>Investment Account</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                          <div className="font-semibold">Crypto</div>
                          <div className="text-xs text-muted-foreground">Instant</div>
                        </button>
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                          <div className="font-semibold">Bank Transfer</div>
                          <div className="text-xs text-muted-foreground">1-3 days</div>
                        </button>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      Deposit Funds
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Withdraw Funds</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">From Account</label>
                      <select className="w-full px-3 py-2 rounded-lg bg-secondary">
                        <option>Savings Account ($25,450.00)</option>
                        <option>Checking Account ($8,230.50)</option>
                        <option>Investment Account ($45,820.00)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Withdrawal Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                          <div className="font-semibold">Crypto Wallet</div>
                          <div className="text-xs text-muted-foreground">Instant</div>
                        </button>
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                          <div className="font-semibold">Bank Account</div>
                          <div className="text-xs text-muted-foreground">1-3 days</div>
                        </button>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      Withdraw Funds
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="transfer">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Transfer Funds</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">From Account</label>
                      <select className="w-full px-3 py-2 rounded-lg bg-secondary">
                        <option>Savings Account</option>
                        <option>Checking Account</option>
                        <option>Investment Account</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Recipient Address</label>
                      <Input
                        placeholder="0x... or email@example.com"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                      />
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Transfer Fee</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Estimated Time</span>
                        <span className="font-medium">Instant</span>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      Send Transfer
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.map((tx, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{tx.type}</span>
                      <span className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.amount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{tx.date}</span>
                      <span className="text-xs text-green-500">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Loan Offers</h3>
              <div className="space-y-3">
                {loanOffers.map((loan, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold mb-2">{loan.type}</h4>
                    <div className="space-y-1 text-sm mb-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate</span>
                        <span className="font-medium">{loan.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Amount</span>
                        <span className="font-medium">{loan.maxAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Term</span>
                        <span className="font-medium">{loan.term}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Security Features</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">FDIC Insured</div>
                    <div className="text-xs text-muted-foreground">Up to $250,000</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">2FA Enabled</div>
                    <div className="text-xs text-muted-foreground">Multi-factor authentication</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Encrypted</div>
                    <div className="text-xs text-muted-foreground">Bank-grade encryption</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

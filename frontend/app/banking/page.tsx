"use client";

import { useState, useEffect } from "react";
import { bankingService } from "@/lib/banking-service";
import { validateAmount, validateAddress, formatCurrency } from "@/lib/validation";
import { TransactionModal } from "@/components/transaction-modal";
import { useToast } from "@/hooks/use-toast";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Send, Download, TrendingUp, CreditCard, Shield, Plus, FileText } from "lucide-react";

export default function BankingPage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("acc-1");
  const [selectedDepositAccount, setSelectedDepositAccount] = useState("acc-1");
  const [selectedWithdrawAccount, setSelectedWithdrawAccount] = useState("acc-1");
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState(bankingService.getAccounts());
  const [transactions, setTransactions] = useState(bankingService.getTransactions(10));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<any>(null);
  const [depositError, setDepositError] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [transferError, setTransferError] = useState("");
  const [loanModalOpen, setLoanModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState<"Personal" | "Business" | "Crypto-Backed">("Personal");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("60");
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const refreshData = () => {
    setAccounts(bankingService.getAccounts());
    setTransactions(bankingService.getTransactions(10));
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const monthlyInterest = bankingService.calculateMonthlyInterest();

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
        await bankingService.deposit(selectedDepositAccount, parseFloat(depositAmount), "crypto");
        refreshData();
        setDepositAmount("");
        toast({ title: "Deposit Successful", description: `Deposited ${formatCurrency(parseFloat(depositAmount))}` });
      },
    });
    setModalOpen(true);
  };

  const handleWithdraw = async () => {
    const account = accounts.find(a => a.id === selectedWithdrawAccount);
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
        await bankingService.withdraw(selectedWithdrawAccount, parseFloat(withdrawAmount), "crypto");
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

  const handleLoanApplication = async () => {
    const maxAmounts = { Personal: 50000, Business: 250000, "Crypto-Backed": 100000 };
    const validation = validateAmount(loanAmount);
    
    if (!validation.isValid) {
      toast({ title: "Invalid Amount", description: validation.error, variant: "destructive" });
      return;
    }

    const amount = parseFloat(loanAmount);
    if (amount > maxAmounts[selectedLoanType]) {
      toast({ title: "Amount Too High", description: `Maximum for ${selectedLoanType} is ${formatCurrency(maxAmounts[selectedLoanType])}`, variant: "destructive" });
      return;
    }

    setModalConfig({
      title: "Confirm Loan Application",
      description: `Apply for ${selectedLoanType} loan`,
      amount: formatCurrency(amount),
      fee: "Processing fee: $50",
      onConfirm: async () => {
        const loan = await bankingService.applyForLoan(selectedLoanType, amount, parseInt(loanTerm));
        setLoanModalOpen(false);
        setLoanAmount("");
        if (loan.status === "Approved") {
          toast({ title: "Loan Approved!", description: `Your ${selectedLoanType} loan has been approved` });
        } else {
          toast({ title: "Loan Rejected", description: "Credit score too low", variant: "destructive" });
        }
      },
    });
    setModalOpen(true);
  };

  const loanOffers = [
    { type: "Personal", rate: "6.5%", maxAmount: "$50,000", term: "5 years" },
    { type: "Business", rate: "5.2%", maxAmount: "$250,000", term: "10 years" },
    { type: "Crypto-Backed", rate: "4.8%", maxAmount: "$100,000", term: "3 years" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        </main>
      </div>
    );
  }

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
            <div className="text-3xl font-bold">{formatCurrency(totalBalance)}</div>
            <div className="text-sm text-green-500 mt-1">+{formatCurrency(monthlyInterest)} this month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Interest Earned</span>
            </div>
            <div className="text-3xl font-bold text-green-500">{formatCurrency(monthlyInterest)}</div>
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
                        <span className="text-sm text-muted-foreground">{account.type} • {account.accountNumber}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{formatCurrency(account.balance)}</div>
                        <div className="text-sm text-green-500">{account.apy}% APY</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => {
                        setSelectedWithdrawAccount(account.id);
                      }}>
                        <Download className="mr-2 h-4 w-4" />
                        Withdraw
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => {
                        setSelectedAccount(account.id);
                      }}>
                        <Send className="mr-2 h-4 w-4" />
                        Transfer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Open New Account
              </Button>
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
                      <select 
                        className="w-full px-3 py-2 rounded-lg bg-secondary border border-input"
                        value={selectedDepositAccount}
                        onChange={(e) => setSelectedDepositAccount(e.target.value)}
                      >
                        {accounts.map((acc) => (
                          <option key={acc.id} value={acc.id}>
                            {acc.name} ({formatCurrency(acc.balance)})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={depositAmount}
                        onChange={(e) => {
                          setDepositAmount(e.target.value);
                          setDepositError("");
                        }}
                        className={depositError ? "border-destructive" : ""}
                      />
                      {depositError && (
                        <p className="text-sm text-destructive mt-1">{depositError}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors border-2 border-primary">
                          <div className="font-semibold">Crypto</div>
                          <div className="text-xs text-muted-foreground">Instant</div>
                        </button>
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                          <div className="font-semibold">Bank Transfer</div>
                          <div className="text-xs text-muted-foreground">1-3 days</div>
                        </button>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleDeposit}>
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
                      <select 
                        className="w-full px-3 py-2 rounded-lg bg-secondary border border-input"
                        value={selectedWithdrawAccount}
                        onChange={(e) => setSelectedWithdrawAccount(e.target.value)}
                      >
                        {accounts.map((acc) => (
                          <option key={acc.id} value={acc.id}>
                            {acc.name} ({formatCurrency(acc.balance)})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => {
                          setWithdrawAmount(e.target.value);
                          setWithdrawError("");
                        }}
                        className={withdrawError ? "border-destructive" : ""}
                      />
                      {withdrawError && (
                        <p className="text-sm text-destructive mt-1">{withdrawError}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Withdrawal Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors border-2 border-primary">
                          <div className="font-semibold">Crypto Wallet</div>
                          <div className="text-xs text-muted-foreground">Instant</div>
                        </button>
                        <button className="px-4 py-3 rounded-lg bg-secondary hover:bg-primary/20 transition-colors">
                          <div className="font-semibold">Bank Account</div>
                          <div className="text-xs text-muted-foreground">1-3 days</div>
                        </button>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleWithdraw}>
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
                      <select 
                        className="w-full px-3 py-2 rounded-lg bg-secondary border border-input"
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.target.value)}
                      >
                        {accounts.map((acc) => (
                          <option key={acc.id} value={acc.id}>
                            {acc.name} ({formatCurrency(acc.balance)})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Recipient Address</label>
                      <Input
                        placeholder="0x... or email@example.com"
                        value={recipientAddress}
                        onChange={(e) => {
                          setRecipientAddress(e.target.value);
                          setTransferError("");
                        }}
                        className={transferError ? "border-destructive" : ""}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => {
                          setTransferAmount(e.target.value);
                          setTransferError("");
                        }}
                        className={transferError ? "border-destructive" : ""}
                      />
                      {transferError && (
                        <p className="text-sm text-destructive mt-1">{transferError}</p>
                      )}
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
                    <Button className="w-full" size="lg" onClick={handleTransfer}>
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
                      <span className={`text-sm font-semibold ${
                        tx.type === "Deposit" || tx.type === "Interest" ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {tx.type === "Deposit" || tx.type === "Interest" ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{tx.date.toLocaleString()}</span>
                      <span className="text-xs text-green-500">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Loan Offers</h3>
                <Button size="sm" onClick={() => setLoanModalOpen(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  Apply
                </Button>
              </div>
              <div className="space-y-3">
                {loanOffers.map((loan, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold mb-2">{loan.type} Loan</h4>
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

      {modalConfig && (
        <TransactionModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalConfig(null);
          }}
          onConfirm={modalConfig.onConfirm}
          title={modalConfig.title}
          description={modalConfig.description}
          amount={modalConfig.amount}
          fee={modalConfig.fee}
        />
      )}
    </div>
  );
}

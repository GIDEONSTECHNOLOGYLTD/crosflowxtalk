"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
  amount?: string;
  fee?: string;
}

export function TransactionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  amount,
  fee,
}: TransactionModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const handleConfirm = async () => {
    setStatus("loading");
    setError("");
    
    try {
      await onConfirm();
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  const handleClose = () => {
    if (status !== "loading") {
      onClose();
      setTimeout(() => setStatus("idle"), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {status === "idle" && (
          <>
            {amount && (
              <div className="space-y-2 py-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold">{amount}</span>
                </div>
                {fee && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="font-semibold">{fee}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">{amount}</span>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm Transaction</Button>
            </DialogFooter>
          </>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold">Processing Transaction...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-semibold">Transaction Successful!</p>
            <p className="text-sm text-muted-foreground">Closing...</p>
          </div>
        )}

        {status === "error" && (
          <>
            <div className="flex flex-col items-center justify-center py-8">
              <XCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-lg font-semibold">Transaction Failed</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleConfirm}>Try Again</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

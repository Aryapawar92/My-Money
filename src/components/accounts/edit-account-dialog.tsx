'use client';

import { useState } from 'react';
import { updateAccount } from '@/actions/account.actions';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Account {
  id: string;
  name: string;
  type: 'BANK' | 'CASH' | 'CREDIT_CARD' | 'OTHER';
  opening_balance: number;
}

interface EditAccountDialogProps {
  account: Account;
}

export function EditAccountDialog({ account }: EditAccountDialogProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(account.name);
  const [type, setType] = useState(account.type);

  const [openingBalance, setOpeningBalance] = useState(String(account.opening_balance));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      await updateAccount(account.id, {
        name,
        type,
        openingBalance: Number(openingBalance),
      });

      setOpen(false);
    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium">Edit</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Account name</Label>

            <Input value={name} onChange={(event) => setName(event.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Account type</Label>

            <select value={type} onChange={(event) => setType(event.target.value as typeof type)} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
              <option value="BANK">Bank Account</option>

              <option value="CASH">Cash</option>

              <option value="CREDIT_CARD">Credit Card</option>

              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Opening balance</Label>

            <Input type="number" min="0" step="0.01" value={openingBalance} onChange={(event) => setOpeningBalance(event.target.value)} required />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState } from 'react';
import { createAccount } from '@/actions/account.actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AccountForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState<'BANK' | 'CASH' | 'CREDIT_CARD' | 'OTHER'>('BANK');

  const [openingBalance, setOpeningBalance] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      await createAccount({
        name,
        type,
        openingBalance: Number(openingBalance),
      });

      setName('');
      setOpeningBalance('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Account name</Label>

        <Input placeholder="Salary Account" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label>Account type</Label>

        <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
          <option value="BANK">Bank Account</option>

          <option value="CASH">Cash</option>

          <option value="CREDIT_CARD">Credit Card</option>

          <option value="OTHER">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Opening balance</Label>

        <Input type="number" min="0" step="0.01" placeholder="0" value={openingBalance} onChange={(e) => setOpeningBalance(e.target.value)} required />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create account'}
      </Button>
    </form>
  );
}

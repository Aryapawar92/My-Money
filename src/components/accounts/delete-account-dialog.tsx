'use client';

import { useState } from 'react';
import { deleteAccount } from '@/actions/account.actions';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';

interface DeleteAccountDialogProps {
  accountId: string;
  accountName: string;
}

export function DeleteAccountDialog({ accountId, accountName }: DeleteAccountDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      await deleteAccount(accountId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex h-9 items-center justify-center rounded-md bg-destructive px-3 text-sm font-medium text-destructive-foreground">
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete <strong>{accountName}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

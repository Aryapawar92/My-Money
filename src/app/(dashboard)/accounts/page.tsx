import { createClient } from '@/lib/supabase/server';
import { AccountForm } from '@/components/accounts/accounts-form';
import { EditAccountDialog } from '@/components/accounts/edit-account-dialog';
import { DeleteAccountDialog } from '@/components/accounts/delete-account-dialog';

export default async function AccountsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: accounts, error } = await supabase.from('accounts').select('*').eq('user_id', user.id).order('created_at', {
    ascending: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Accounts</h1>

        <p className="text-muted-foreground">Manage where your money is stored.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <h2 className="font-semibold">Your accounts</h2>

          {accounts.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">You don't have any accounts yet.</p>
            </div>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="rounded-lg border bg-background p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{account.name}</h3>

                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>

                  <p className="text-lg font-semibold">₹{Number(account.opening_balance).toLocaleString('en-IN')}</p>
                  <div className="mt-4 flex gap-2">
                    <EditAccountDialog account={account} />

                    <DeleteAccountDialog accountId={account.id} accountName={account.name} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="rounded-lg border bg-background p-6">
          <h2 className="mb-6 font-semibold">Add account</h2>

          <AccountForm />
        </div>
      </div>
    </div>
  );
}

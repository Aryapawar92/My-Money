'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

type AccountType = 'BANK' | 'CASH' | 'CREDIT_CARD' | 'OTHER';

interface AccountData {
  name: string;
  type: AccountType;
  openingBalance: number;
}

export async function createAccount(data: AccountData) {
  const supabase = await createClient();

  const {data: { user },} = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: account, error } = await supabase
    .from('accounts')
    .insert({
      user_id: user.id,
      name: data.name,
      type: data.type,
      opening_balance: data.openingBalance,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/accounts');

  return account;
}

export async function updateAccount(id: string, data: AccountData) {
  const supabase = await createClient();

  const {data: { user },} = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: account, error } = await supabase
    .from('accounts')
    .update({
      name: data.name,
      type: data.type,
      opening_balance: data.openingBalance,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/accounts');

  return account;
}

export async function deleteAccount(id: string) {
  const supabase = await createClient();

  const {data: { user },} = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { error } = await supabase.from('accounts').delete().eq('id', id).eq('user_id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath('/accounts');

  return { success: true };
}

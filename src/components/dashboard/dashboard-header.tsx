'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardHeaderProps {
  email: string;
}

export function DashboardHeader({ email }: DashboardHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace('/login');
    router.refresh();
  }

  const initials = email.charAt(0).toUpperCase();

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="font-semibold">My Money</h1>
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="hidden text-sm sm:block">{email}</div>

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}

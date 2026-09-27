import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">My Money</h1>

          <p className="mt-2 text-muted-foreground">Your money, simplified.</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}

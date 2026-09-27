import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('test').select('*');

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">My Money</h1>

      <p className="mt-4">Supabase URL:</p>

      <p>{process.env.NEXT_PUBLIC_SUPABASE_URL}</p>

      <pre className="mt-4">{JSON.stringify({ data, error }, null, 2)}</pre>
    </main>
  );
}

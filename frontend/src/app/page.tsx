import { authWithParams } from '@/lib/auth';
import Home from '@/components/Home/Home';
import { notFound } from 'next/navigation';

export default async function Page(
  { searchParams }: { searchParams: Promise<{ [key: string]: string }> },
) {
  const user = await authWithParams(await searchParams);

  if (!user) {
    notFound();
  }

  return (
    <Home user={user} />
  );
}

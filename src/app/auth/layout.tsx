import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect('/');
  }

  console.log({ session });

  return (
    <main className='flex justify-center'>
      <div className='w-full sm:w-87.5 px-10'>{children}</div>
    </main>
  );
}

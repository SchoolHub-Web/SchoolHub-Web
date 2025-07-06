import { ReactNode } from 'react';
import { isLogged } from '@/api/auth';
import { redirect, RedirectType } from 'next/navigation';
import { Header } from '@/components/layout/header';

export default async function ({ children }: { children: ReactNode }) {
  const logged = await isLogged();

  if (!logged) {
    redirect('/login', RedirectType.push);
  }

  return (
    <div className='flex h-screen w-screen flex-col bg-secondary-100 p-4'>
      <Header />
      {children}
    </div>
  );
}

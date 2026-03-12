'use client';

import Image from 'next/image';
import ClientLayout from '@/components/layouts/ClientLayout';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  console.log('Home');

  const auth = useAuth();

  return (
    <ClientLayout auth={auth}>
      <div>
        Home
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </div>
    </ClientLayout>
  );
}
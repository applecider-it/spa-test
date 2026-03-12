'use client';

import Image from 'next/image';
import ClientLayout from '@/components/layouts/ClientLayout';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import LoadingBlock from '@/components/ui/LoadingBlock';

export default function Home() {
  const [text, setText] = useState('');

  const auth = useAuth((user) => {
    console.log('callback', user);

    if (user) setText('test ' + user.name);
  });

  console.log('Home', auth);

  return (
    <ClientLayout auth={auth}>
      <div>
        <h2 className="app-h2">Home</h2>

        <div className="border-4 p-5">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
        </div>
      </div>

      <div className="mt-5">
        {auth.loading ? (
          <LoadingBlock />
        ) : (
          <div>
            <div>text: {text}</div>
            <div>auth.loading: {auth.loading ? 'on' : 'off'}</div>
            <div>auth.user: {auth.user ? auth.user.name : 'none'}</div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}

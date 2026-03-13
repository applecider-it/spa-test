'use client';

import ClientLayout from '@/components/layouts/ClientLayout';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import LoadingBlock from '@/components/ui/LoadingBlock';

export default function Home() {
  const [desc, setDesc] = useState('');

  const auth = useAuth((user) => {
    console.log('callback', user);

    if (user) setDesc('desc desc desc desc ' + user.name);
  });

  const labelClass = 'mb-5 font-bold text-xl';

  console.log('Home', auth);

  return (
    <ClientLayout auth={auth} needAuth={true}>
      <div>
        <h2 className="app-h2">Profile</h2>
      </div>
      {auth.loading ? (
        <LoadingBlock height="12rem" />
      ) : (
        <div className="space-y-5">
          <div>
            <div className={labelClass}>Name</div>
            <div>{auth.user ? auth.user.name : 'none'}</div>
          </div>
          <div>
            <div className={labelClass}>Description</div>
            <div>{desc}</div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
}

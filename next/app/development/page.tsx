'use client';
import SendTest from '@/components/development/SendTest';
import LoginTest from '@/components/development/LoginTest';

import ClientLayout from '@/components/layouts/ClientLayout';
import { useAuth } from '@/hooks/useAuth';
import LoadingBlock from '@/components/ui/LoadingBlock';

export default function Development() {
  console.log('Development');

  const auth = useAuth();

  const blockClass = "border-2 p-10 my-5"

  return (
    <ClientLayout auth={auth}>
      <div>
        <h2 className='app-h2'>Development</h2>

        {auth.loading ? <LoadingBlock height="10rem" /> : <div className={blockClass}><SendTest /></div>}

        <div className={blockClass}><LoginTest /></div>
      </div>
    </ClientLayout>
  );
}

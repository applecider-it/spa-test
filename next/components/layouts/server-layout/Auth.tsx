'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import LoadingLine from '@/components/ui/LoadingLine';

/**
 * サーバーレイアウトの認証
 */
export default function Auth() {
  const auth = useAuth();

  console.log('ServerLayout Auth', auth);

  const linkClass = 'text-gray-500 underline';

  return (
    <>
      {auth.loading ? (
        <LoadingLine />
      ) : (
        <>
          {auth.user && (
            <Link href="/profile" prefetch={false} className={linkClass}>
              ユーザーページ
            </Link>
          )}

          <span>{auth.user ? <>{auth.user.name}</> : <>Guest</>}</span>
        </>
      )}
    </>
  );
}

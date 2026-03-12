'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

/**
 * レイアウト
 */
export default function ClientLayout({
  children,
  auth,
  needAuth = false,
}: Readonly<{
  children: React.ReactNode;
  auth: ReturnType<typeof useAuth>;
  needAuth?: boolean;
}>) {
  console.log('ClientLayout auth', auth);

  const authError = needAuth && !auth.loading && !auth.user;

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100">
        <div className="space-x-3 p-5">
          <Link href="/" prefetch={false} className="app-link-normal">
            Top
          </Link>
          <Link
            href="/development"
            prefetch={false}
            className="app-link-normal"
          >
            開発者向けページ
          </Link>
          <Link href="/profile" prefetch={false} className="app-link-normal">
            プロファイル
          </Link>
        </div>
        <div className="p-5">
          {auth.loading ? (
            <span>...</span>
          ) : (
            <span>{auth.user ? <>{auth.user.name}</> : <>Guest</>}</span>
          )}
        </div>
      </div>

      <div className="container mx-auto my-10">
        {authError ? (
          <div>このページへのアクセス権がありません。</div>
        ) : (
          children
        )}
      </div>
    </>
  );
}

'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import LoadingLine from '@/components/ui/LoadingLine';

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

  const linkClass = 'text-gray-500 underline';

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100">
        <div className="space-x-3 px-7 py-8">
          <span className="text-xl pr-5">SPA Test</span>
          <Link href="/" prefetch={false} className={linkClass}>
            Top
          </Link>
          <Link href="/development" prefetch={false} className={linkClass}>
            開発者向けページ
          </Link>
          <Link href="/profile" prefetch={false} className={linkClass}>
            プロファイル
          </Link>
        </div>
        <div className="p-5">
          {auth.loading ? (
            <LoadingLine />
          ) : (
            <span>{auth.user ? <>{auth.user.name}</> : <>Guest</>}</span>
          )}
        </div>
      </div>

      <div className="container mx-auto my-10">
        {authError ? (
          <div className="text-center my-20 border rounded-2xl p-20 bg-blue-50 shadow-lg text-gray-500">
            このページへのアクセス権がありません。
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
}

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
}: Readonly<{
  children: React.ReactNode;
  auth: ReturnType<typeof useAuth>;
}>) {
  console.log('ClientLayout auth', auth);

  return (
    <>
      <div className="space-x-3">
        <Link href="/" prefetch={false} className="text-blue-500 underline">
          Top
        </Link>
        <Link
          href="/development"
          prefetch={false}
          className="text-blue-500 underline"
        >
          開発者向けページ
        </Link>
        {auth.loading ? (
          <span>...</span>
        ) : (
          <span>{auth.user ? <>{auth.user.name}</> : <>Error</>}</span>
        )}
      </div>
      {children}
    </>
  );
}

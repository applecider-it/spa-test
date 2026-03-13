import React from 'react';
import Link from 'next/link';

import Auth from './server-layout/Auth'

/**
 * レイアウト
 */
export default function ServerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('ServerLayout');

  const linkClass = 'text-gray-500 underline';

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100">
        <div className="space-x-3 px-7 py-8">
          <span className="text-xl pr-5">SPA Test</span>
          <Link href="/" prefetch={false} className={linkClass}>
            Top
          </Link>
          <Link href="/posts/1" prefetch={false} className={linkClass}>
            Blog
          </Link>
        </div>
        <div className="space-x-3 px-7 py-8">
          <Auth />
        </div>
      </div>

      <div className="container mx-auto my-10">
        {children}
      </div>
    </>
  );
}

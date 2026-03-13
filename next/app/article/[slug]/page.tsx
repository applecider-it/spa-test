import ServerLayout from '@/components/layouts/ServerLayout';
import { posts } from '@/.velite';
import { notFound } from 'next/navigation';

import { toLocaleString } from '@/services/data/datetime';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <ServerLayout>
      <article>
        <h2 className="app-h2">{post.title}</h2>
        <div className="text-right text-gray-500 text-sm mt-5">
          {toLocaleString(post.date)}
        </div>

        <div
          className="app-post-content-container mt-10"
          dangerouslySetInnerHTML={{
            __html: post.body,
          }}
        />
      </article>
    </ServerLayout>
  );
}

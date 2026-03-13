import Link from 'next/link';

import ServerLayout from '@/components/layouts/ServerLayout';
import ServerPaginate from '@/components/nav/ServerPaginate';

import { Post, posts } from '@/.velite';

import { getPageInfo } from '@/services/nav/paginate';

import { toLocaleString } from '@/services/data/datetime';

const PER_PAGE = 2;

const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export async function generateStaticParams() {
  const info = getPageInfo<Post>(sortedPosts, 1, PER_PAGE);
  console.log('generateStaticParams', info);

  return info.staticParams;
}

export default async function Posts({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const pageNum = Number(page);

  console.log('Posts', page);

  const info = getPageInfo<Post>(sortedPosts, pageNum, PER_PAGE);
  console.log('info', info);

  return (
    <ServerLayout>
      <div>
        <h2 className="app-h2">Blog</h2>

        <div className="space-y-5">
          {info.list.map((post) => (
            <Link
              href={`/article/${post.slug}`}
              prefetch={false}
              key={post.slug}
              className="block"
            >
              <article className="border-2 p-5">
                <h3 className="app-h3">{post.title}</h3>
                <div className="my-3">{post.description}</div>
                <div className="text-right text-gray-500 text-sm">
                  {toLocaleString(post.date)}
                </div>
              </article>
            </Link>
          ))}
        </div>

        <ServerPaginate page={pageNum} info={info} />
      </div>
    </ServerLayout>
  );
}

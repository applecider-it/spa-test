import Link from 'next/link';

import ServerLayout from '@/components/layouts/ServerLayout';

import { posts } from '@/.velite';

export default function Posts() {
  console.log('Posts');

  return (
    <ServerLayout>
      <div>
        <h2 className="app-h2">Blog</h2>

        <div>
          {posts.map((post) => (
            <Link href={`/article/${post.slug}`} prefetch={false} key={post.slug}>
              <article className='border-2 p-5'>
                <h3 className='app-h3'>{post.title}</h3>
                <div>
                  {post.description}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </ServerLayout>
  );
}

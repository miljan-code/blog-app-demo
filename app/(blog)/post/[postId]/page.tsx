import Image from 'next/image';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { clerkClient } from '@clerk/nextjs';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { post } from '@/db/schema';
import type { OutputData, OutputBlockData } from '@editorjs/editorjs';

export function renderBlock(block: OutputBlockData) {
  if (block.type === 'paragraph') {
    return <p>{block.data.text}</p>;
  }

  if (block.type === 'header') {
    if (block.data.level === 1)
      return (
        <h1 className="text-5xl font-extrabold tracking-tight">
          {block.data.text}
        </h1>
      );
    if (block.data.level === 2)
      return (
        <h2 className="text-4xl font-bold tracking-tight">{block.data.text}</h2>
      );
    if (block.data.level === 3)
      return <h3 className="text-3xl font-bold">{block.data.text}</h3>;
    if (block.data.level === 4)
      return <h4 className="text-2xl font-bold">{block.data.text}</h4>;
    if (block.data.level === 5)
      return <h5 className="text-xl font-semibold">{block.data.text}</h5>;
    if (block.data.level === 6)
      return <h6 className="text-lg">{block.data.text}</h6>;
  }

  return <span>{block.data.text}</span>;
}

const getPost = async (postId: number) => {
  return db.select().from(post).where(eq(post.id, postId));
};

interface PostPageProps {
  params: {
    postId: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const [post] = await getPost(+params.postId);
  const user = await clerkClient.users.getUser(post.author);

  if (!post) {
    notFound();
  }

  const { blocks } = post.content as OutputData;

  return (
    <section className="py-6 md:py-8 lg:py-12">
      <div className="max-w-5xl mx-auto px-8 flex flex-col gap-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Published on {format(new Date(post.createdAt!), 'MMMM dd, yyyy')}
            </span>
            <h2 className="text-4xl font-bold tracking-tight">{post.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col text-sm">
              <span className="text-muted-foreground">Author</span>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <Image
              src={user.imageUrl}
              alt="Profile pic"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="relative h-96 w-full rounded-md overflow-hidden mb-4 border border-border">
          <Image
            src={post.coverUrl || ''}
            alt={post.title}
            fill
            className="object-cover"
            sizes="99vw"
          />
        </div>
        <div className="flex flex-col gap-3">
          {blocks.map(block => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostPage;

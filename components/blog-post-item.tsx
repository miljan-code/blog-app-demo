import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/db/schema';
import { OutputData } from '@editorjs/editorjs';

interface BlogPostItemProps extends Post {}

export const BlogPostItem = async ({
  coverUrl,
  title,
  createdAt,
  id,
  content,
}: BlogPostItemProps) => {
  const paragraph = (content as OutputData)?.blocks.find(
    block => block.type === 'paragraph'
  )?.data as { text: string };

  return (
    <div className="flex flex-col gap-1">
      <Link
        href={`/post/${id}`}
        className="relative h-64 border-border border rounded-md overflow-hidden mb-1"
      >
        <Image
          src={coverUrl || ''}
          alt={title}
          fill
          className="object-cover"
          sizes="99vw"
          priority
        />
      </Link>
      <Link href={`/post/${id}`} className="text-2xl font-bold">
        {title}
      </Link>
      <p className="text-muted-foreground">{paragraph?.text.slice(0, 90)}...</p>
      <span className="text-sm text-muted-foreground">
        {format(new Date(createdAt!), 'dd. MMM yyyy')}
      </span>
    </div>
  );
};

import Link from 'next/link';
import { format } from 'date-fns';
import { PostOperations } from '@/components/post-operations';
import type { Post } from '@/db/schema';

interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(post.createdAt || 0), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>
      <PostOperations post={post} />
    </div>
  );
};

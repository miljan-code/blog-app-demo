import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { post } from '@/db/schema';
import { cn } from '@/lib/utils';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { NewPostButton } from '@/components/new-post-button';
import { PostItem } from '@/components/post-item';
import { buttonVariants } from '@/components/ui/button';

const getPosts = async () => {
  const user = await currentUser();

  if (!user) return null;

  return await db.select().from(post).where(eq(post.author, user.id));
};

const DashboardPage = async () => {
  const posts = await getPosts();

  if (!posts?.length) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="file" />
        <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any posts yet. Start creating content.
        </EmptyPlaceholder.Description>
        <NewPostButton
          className={cn(buttonVariants({ variant: 'secondary' }))}
        />
      </EmptyPlaceholder>
    );
  }

  return (
    <div className="divide-y divide-border rounded-md border">
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default DashboardPage;

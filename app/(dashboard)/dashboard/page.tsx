import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { NewPostButton } from '@/components/new-post-button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DashboardPage = () => {
  const posts = []; // temp

  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="file" />
      <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You don&apos;t have any posts yet. Start creating content.
      </EmptyPlaceholder.Description>
      <NewPostButton className={cn(buttonVariants({ variant: 'secondary' }))} />
    </EmptyPlaceholder>
  );
};

export default DashboardPage;

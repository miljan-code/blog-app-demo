'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import type { Post } from '@/db/schema';

interface NewPostButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const NewPostButton = ({ className, ...props }: NewPostButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createNewPostHandler = async () => {
    setIsLoading(true);

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Untitled Post',
      }),
    });

    setIsLoading(false);

    if (!res?.ok) {
      if (res?.status === 403) {
        return router.push('/login');
      }

      // TODO: add toaster
      if (res?.status === 422) {
        return console.error('Zod Error');
      }

      return console.error('Something went wrong!');
    }

    const post: Post = (await res.json())[0];

    router.refresh();

    router.push(`/editor/${post.id}`);
  };

  return (
    <button
      className={cn(buttonVariants({ size: 'sm' }), 'px-4', className)}
      disabled={isLoading}
      onClick={createNewPostHandler}
      {...props}
    >
      {isLoading ? (
        <Icons.loader className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <Icons.plus className="h-4 w-4 mr-2" />
      )}
      New post
    </button>
  );
};

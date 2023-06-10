'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface NewPostButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const NewPostButton = ({ className, ...props }: NewPostButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className={cn(buttonVariants({ size: 'sm' }), 'px-4', className)}
      disabled={isLoading}
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

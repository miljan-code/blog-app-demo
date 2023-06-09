'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const NewPostButton = () => {
  return (
    <Link href="/posts" className={cn(buttonVariants({ size: 'sm' }), 'px-4')}>
      New post
    </Link>
  );
};

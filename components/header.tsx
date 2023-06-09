import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { NewPostButton } from '@/components/new-post-button';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header = async () => {
  const user = await currentUser();

  return (
    <header className="px-8 mx-auto max-w-5xl py-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 w-fit">
        <Icons.logo className="w-6 h-6" />
        <span className="font-semibold">Modern Blog</span>
      </Link>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        {user ? (
          <>
            <Link href="/dashboard">
              <Avatar>
                <AvatarImage src={user?.profileImageUrl} />
                <AvatarFallback>{user?.username}</AvatarFallback>
              </Avatar>
            </Link>
            <NewPostButton />
          </>
        ) : (
          <Link
            href="/login"
            className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

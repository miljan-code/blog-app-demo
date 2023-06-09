import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export const Header = () => {
  return (
    <header className="container py-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 w-fit">
        <Icons.logo className="w-6 h-6" />
        <span className="font-semibold">Modern Blog</span>
      </Link>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <Link
          href="/login"
          className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
        >
          Login
        </Link>
      </div>
    </header>
  );
};

'use client';

import { useClerk } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <Button variant="secondary" onClick={() => signOut()} className="w-fit">
      Sign out
    </Button>
  );
};

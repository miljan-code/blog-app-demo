'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const UserAuthCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (provider: string) => {
    // setIsLoading(true);
    // signIn(provider).then(() => {
    //   setIsLoading(false);
    // });
  };

  return (
    <Card className="flex w-full max-w-sm flex-col px-8 py-10">
      <CardTitle className="pb-1">Hello 👋</CardTitle>
      <CardDescription className="pb-8">
        Sign in to continue to Modern Blog
      </CardDescription>
      <div className="flex flex-col space-y-2 pb-4">
        <Button
          onClick={() => handleSignIn('google')}
          variant="outline"
          className="space-x-4 px-10"
          disabled={isLoading}
        >
          <Icons.google className="h-4 w-4" />
          <span className="text-xs sm:text-sm">Continue with Google</span>
        </Button>
        <Button
          onClick={() => handleSignIn('github')}
          variant="outline"
          className="space-x-4 px-10"
          disabled={isLoading}
        >
          <Icons.gitHub className="h-4 w-4" />
          <span className="text-xs sm:text-sm">Continue with GitHub</span>
        </Button>
      </div>
    </Card>
  );
};

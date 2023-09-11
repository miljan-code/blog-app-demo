'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { toast } from './ui/use-toast';

type OAuthProvider = 'oauth_google' | 'oauth_github';

export const OAuthSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();

  const oauthSignIn = async (provider: OAuthProvider) => {
    if (!isSignInLoaded) return null;

    try {
      setIsLoading(true);

      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/',
        redirectUrlComplete: '/',
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'You are not logged in',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex w-full max-w-sm flex-col px-8 py-10">
      <CardTitle className="pb-1">Welcome back</CardTitle>
      <CardDescription className="pb-8">Sign in to continue</CardDescription>
      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          className="space-x-4 px-10"
          disabled={isLoading}
          onClick={() => oauthSignIn('oauth_google')}
        >
          <Icons.google className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Continue with Google</span>
        </Button>
        <Button
          variant="outline"
          className="space-x-4 px-10"
          disabled={isLoading}
          onClick={() => oauthSignIn('oauth_github')}
        >
          <Icons.gitHub className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Continue with GitHub</span>
        </Button>
      </div>
    </Card>
  );
};

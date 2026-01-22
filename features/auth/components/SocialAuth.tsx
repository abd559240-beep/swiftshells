"use client";

import { GoogleIcon01 } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/portal";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { DEFAULT_AUTH_PATH } from "@/lib/constant/constant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SocialAuth({
  redirect,
}: {
  redirect?: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const redirectLink = redirect ?? DEFAULT_AUTH_PATH;

  useEffect(() => {
    (async () => {
      try {
        await authClient.oneTap({
          callbackURL: redirectLink,
          fetchOptions: {
            onRequest: () => {
              setIsLoading(true);
            },
            onSuccess: () => {
              setIsLoading(false);
            },
            onError: ({ error }) => {
              toast.error(error.message);
              setIsLoading(false);
            },
          },
        });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Error in OneTap Login",
        );
      }
    })();
  }, [redirectLink]);

  const handleGoogleLogin = async () =>
    authClient.signIn.social({
      provider: "google",
      callbackURL: redirectLink,
      newUserCallbackURL: redirectLink,
      errorCallbackURL: "/error",
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: ({ error }) => {
          toast.error(error.message);
          setIsLoading(false);
        },
      },
    });

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <GoogleIcon01 />
              <span>Login with Google</span>
            </>
          )}
        </Button>
      </div>
      {isLoading && (
        <Portal>
          <div className="fixed inset-0 z-50 flex h-svh w-full items-center justify-center bg-black/50">
            <Spinner size={50} />
          </div>
        </Portal>
      )}
    </>
  );
}

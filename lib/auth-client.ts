import { oneTapClient, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "./configs/env.config";
import { accessControl } from "./accessControl";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_HOST_URL,
  plugins: [
    adminClient({ ...accessControl }),
    oneTapClient({
      clientId: env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: "signin",
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5,
      },
    }),
  ],
});

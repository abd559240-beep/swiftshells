import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    GOOGLE_AUTH_CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_HOST_URL: z.string().url(),
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID: z.string(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  },
  emptyStringAsUndefined: true,
});

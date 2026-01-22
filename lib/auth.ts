import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma-client";
import { env } from "./configs/env.config";
import { UserRoleEnumSchema } from "./prisma-zod/schemas/schemas";
import { AccessControl, admin, oneTap, openAPI } from "better-auth/plugins";
import { accessControl } from "./accessControl";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  appName: "Swift Shells",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  telemetry: { enabled: true },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  baseURL: env.NEXT_PUBLIC_HOST_URL,
  account: {
    accountLinking: {
      trustedProviders: ["google", "email-password"],
    },
  },
  socialProviders: {
    google: {
      clientId: env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_AUTH_CLIENT_SECRET,
      redirectURI: `${env.NEXT_PUBLIC_HOST_URL}/api/auth/callback/google`,
      accessType: "offline",
      prompt: "select_account",
    },
  },
  user: {
    changeEmail: {
      enabled: false,
    },
    deleteUser: {
      enabled: false,
    },
    additionalFields: {
      role: {
        type: UserRoleEnumSchema.options,
        defaultValue: UserRoleEnumSchema.Enum.USER,
        input: true,
      },
    },
  },
  plugins: [
    nextCookies(),
    admin({
      ac: accessControl.ac as AccessControl,
      roles: accessControl.roles,
      defaultRole: UserRoleEnumSchema.Enum.USER,
      defaultBanExpiresIn: 60 * 60 * 24 * 10, // 10 day
      bannedUserMessage: "Your account is currently banned",
      adminRoles: [
        UserRoleEnumSchema.Enum.SUPER_ADMIN,
        UserRoleEnumSchema.Enum.ADMIN,
      ],
    }),
    openAPI(),
    oneTap(),
  ],
});

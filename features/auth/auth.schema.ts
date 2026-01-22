import { emailField, passwordField } from "@/lib/baseZodSchema";
import { env } from "@/lib/configs/env.config";
import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Full name is required" })
      .min(1, "Full name is required")
      .max(80, "Full name is too long"),
    email: emailField({ fieldName: "email" }),
    password: passwordField({
      fieldName: "password",
      restrict: env.NEXT_PUBLIC_NODE_ENV === "production",
    }),
    confirmPassword: passwordField({
      fieldName: "confirm password",
      restrict: env.NEXT_PUBLIC_NODE_ENV === "production",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and confirmPassword not matched",
  });
export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: emailField({ fieldName: "email" }),
  password: passwordField({
    fieldName: "password",
    restrict: env.NEXT_PUBLIC_NODE_ENV === "production",
  }),
  rememberMe: z.boolean().optional(),
});
export type LoginType = z.infer<typeof loginSchema>;

export const magicLinkSchema = z.object({
  email: emailField({ fieldName: "email" }),
});
export type MagicLinkType = z.infer<typeof magicLinkSchema>;

export const forgetPasswordSchema = z.object({
  email: emailField({ fieldName: "email" }),
});
export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: passwordField({
      fieldName: "password",
      restrict: env.NEXT_PUBLIC_NODE_ENV === "production",
    }),
    confirmPassword: passwordField({
      fieldName: "password",
      restrict: env.NEXT_PUBLIC_NODE_ENV === "production",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password and confirmPassword not matched",
  });
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

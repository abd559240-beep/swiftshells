"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginType } from "../../auth.schema";
import { DEFAULT_AUTH_PATH } from "@/lib/constant/constant";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputField } from "@/components/form-fields";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import RememberMe from "../RememberMe";
import { ButtonSpinner } from "@/components/ButtonSpinner";
import { authClient } from "@/lib/auth-client";

export default function LoginForm({
  redirect,
}: {
  redirect?: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSubmit = async (e: LoginType) => {
    await authClient.signIn.email(
      {
        email: e.email,
        password: e.password,
        callbackURL: redirect || DEFAULT_AUTH_PATH,
        rememberMe: e.rememberMe,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          toast.success("Login Successfully");
          form.reset();
          setIsLoading(false);
        },
        onError: (ctx) => {
          if (ctx?.error?.code === "EMAIL_NOT_VERIFIED") {
            // const email = form.getValues().email;
            toast(
              (t) => (
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="font-semibold">
                      Your email is not verified
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Click this button to resend email verification mail
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      toast.dismiss(t.id);
                      // sendVerificationEmail({
                      //   email,
                      //   callbackURL: DEFAULT_AUTH_PATH,
                      // });
                    }}
                    size="sm"
                    variant="secondary"
                  >
                    Resend
                  </Button>
                </div>
              ),
              {
                duration: 5000,
              },
            );
          } else {
            toast.error(ctx.error.message);
          }
          setIsLoading(false);
          form.reset();
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <InputField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Email Address"
          disabled={isLoading}
          requiredField
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <span className="text-destructive">*</span>
                <Link
                  href={{ pathname: "/forget-password" }}
                  className="link ml-auto text-sm"
                >
                  Forget password?
                </Link>
              </div>
              <PasswordInput
                {...field}
                id="password"
                placeholder="Password"
                disabled={isLoading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <RememberMe
          control={form.control}
          name="rememberMe"
          disabled={isLoading}
        />
        <ButtonSpinner type="submit" className="w-full" isLoading={isLoading}>
          Login
        </ButtonSpinner>
      </FieldGroup>
    </form>
  );
}

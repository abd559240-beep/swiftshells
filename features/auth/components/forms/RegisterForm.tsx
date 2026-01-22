"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { registerSchema, RegisterType } from "../../auth.schema";
import { authClient } from "@/lib/auth-client";
import { FieldGroup } from "@/components/ui/field";
import { InputField, PasswordInputField } from "@/components/form-fields";
import { ButtonSpinner } from "@/components/ButtonSpinner";
import { DEFAULT_AUTH_PATH } from "@/lib/constant/constant";

export default function RegisterForm({
  redirect,
}: {
  redirect?: string | undefined;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (e: RegisterType) => {
    await authClient.signUp.email({
      email: e.email,
      name: e.name,
      password: e.password,
      callbackURL: redirect ?? DEFAULT_AUTH_PATH,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          toast.success("Registration Successfully");
          form.reset();
          setIsLoading(false);
        },
        onError: ({ error }) => {
          toast.error(error.message);
          form.reset();
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <InputField
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Full name"
          disabled={isLoading}
          requiredField
        />
        <InputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="Email Password"
          disabled={isLoading}
          requiredField
        />
        <PasswordInputField
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
          disabled={isLoading}
          requiredField
        />
        <PasswordInputField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          disabled={isLoading}
          requiredField
        />
        <ButtonSpinner type="submit" className="w-full" isLoading={isLoading}>
          Register
        </ButtonSpinner>
      </FieldGroup>
    </form>
  );
}

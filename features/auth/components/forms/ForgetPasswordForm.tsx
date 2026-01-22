"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { forgetPasswordSchema, ForgetPasswordType } from "../../auth.schema";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/form-fields";
import { ButtonSpinner } from "@/components/ButtonSpinner";
import { RESET_PASSWORD_PATH } from "@/lib/constant/constant";

const ForgetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ForgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (e: ForgetPasswordType) => {
    await authClient.requestPasswordReset({
      email: e.email,
      redirectTo: RESET_PASSWORD_PATH,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          toast.success("Reset password email is sent");
          setIsLoading(false);
          form.reset();
        },
        onError: ({ error: { message } }) => {
          toast.error(message);
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
          name="email"
          type="email"
          placeholder="Email Address"
          label="Email"
          disabled={isLoading}
        />
        <ButtonSpinner type="submit" className="w-full" isLoading={isLoading}>
          Forget Password
        </ButtonSpinner>
      </FieldGroup>
    </form>
  );
};

export default ForgetPasswordForm;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { resetPasswordSchema, ResetPasswordType } from "../../auth.schema";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FieldGroup } from "@/components/ui/field";
import { PasswordInputField } from "@/components/form-fields";
import { ButtonSpinner } from "@/components/ButtonSpinner";
import { DEFAULT_UNAUTH_PATH } from "@/lib/constant/constant";
import { useRouter } from "next/navigation";

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (e: ResetPasswordType) => {
    await authClient.resetPassword({
      newPassword: e.password,
      token,
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          toast.success("Password is changed");
          setIsLoading(false);
          form.reset();
          router.push(DEFAULT_UNAUTH_PATH);
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
          Submit
        </ButtonSpinner>
      </FieldGroup>
    </form>
  );
};

export default ResetPasswordForm;

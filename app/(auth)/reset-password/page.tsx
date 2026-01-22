import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "@/features/auth/components/forms/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password | Swift Shells",
  description: "This is Swift Shells management software reset password page",
};

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    token?: string;
  }>;
}) {
  const { error, token } = await searchParams;

  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="bg-destructive rounded-md border-2 border-red-600 p-4 text-center text-xl font-medium text-white shadow-md">
            Something went wrong
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!token) {
    return (
      <Card>
        <CardContent>
          <div className="text-destructive text-center text-xl font-semibold">
            &apos;token&apos; is not found in search | query params
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset Password?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResetPasswordForm token={token} />
      </CardContent>
    </Card>
  );
}

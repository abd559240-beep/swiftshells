import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgetPasswordForm from "@/features/auth/components/forms/ForgetPasswordForm";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forget password | Swift Shells",
  description: "This is Swift Shells management software forget password page",
};

export default function ForgetPasswordPage() {
  return (
    <Card>
      <div className="-mb-6 px-6">
        <Link href={{ pathname: "/login" }}>
          <ArrowLeft className="text-muted-foreground" />
        </Link>
      </div>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Forgot Your Password?</CardTitle>
        <CardDescription>
          No worries! Let{`'`}s help you get back on track.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ForgetPasswordForm />
      </CardContent>
    </Card>
  );
}

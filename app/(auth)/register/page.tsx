import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/features/auth/components/forms/RegisterForm";
import SocialAuth from "@/features/auth/components/SocialAuth";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | Swift Shells",
  description: "This is Swift Shells management software register page",
};

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Let’s Get Started!</CardTitle>
        <CardDescription>Sign up to explore amazing features.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RegisterForm />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <SocialAuth />
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm">
          Do you have an account?{" "}
          <Link href={{ pathname: "/login" }} className="link">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/features/auth/components/forms/LoginForm";
import SocialAuth from "@/features/auth/components/SocialAuth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>
          Sign in to access your account and continue your journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <SocialAuth />
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={{ pathname: "/register" }} className="link">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

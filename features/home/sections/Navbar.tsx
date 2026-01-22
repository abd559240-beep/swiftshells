import TopbarUser from "@/components/topbar/TopbarUser";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Navbar() {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-linear-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Swift Shells</h1>
      </div>
      {authSession ? (
        <TopbarUser user={{ ...authSession.user, isActive: true }} />
      ) : (
        <Button asChild>
          <Link href={{ pathname: "/login" }}>Login</Link>
        </Button>
      )}
    </nav>
  );
}

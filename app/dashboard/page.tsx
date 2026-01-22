import UserDashboard from "@/features/dashboard/components/UserDashboard";
import { auth } from "@/lib/auth";
import { DEFAULT_UNAUTH_PATH } from "@/lib/constant/constant";
import { UserRoleEnumSchema } from "@/lib/prisma-zod/schemas/schemas";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Swift Shells",
  description: "This is Swift Shells management software dashboard page",
};

export default async function Page() {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!authSession) {
    return redirect(DEFAULT_UNAUTH_PATH);
  }

  const dashboards = {
    [UserRoleEnumSchema.Enum.USER]: <UserDashboard />,
    [UserRoleEnumSchema.Enum.ADMIN]: <UserDashboard />,
    [UserRoleEnumSchema.Enum.SUPER_ADMIN]: <UserDashboard />,
  };

  return (
    <>
      {authSession.user.role ? (
        dashboards[authSession.user.role]
      ) : (
        <UserDashboard />
      )}
    </>
  );
}

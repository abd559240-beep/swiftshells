import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Topbar from "@/components/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { DEFAULT_UNAUTH_PATH } from "@/lib/constant/constant";
import { AuthStoreProvider } from "@/stores/zustand/auth/AuthStoreContext";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!authSession) {
    return redirect(DEFAULT_UNAUTH_PATH);
  }

  return (
    <AuthStoreProvider user={{ ...authSession.user, isActive: true }}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Topbar />
          <main className="min-h-[calc(100vh-84px)] flex-1 px-2 pt-2 pb-2 sm:px-4 sm:pt-3 sm:pb-4">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthStoreProvider>
  );
}

"use client";
import { useAuthStore } from "@/stores/zustand/auth/AuthStoreContext";
import ThemeChanger from "../ThemeChanger";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import TopbarUser from "./TopbarUser";

export default function Topbar() {
  const user = useAuthStore((state) => state.user!);

  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-1 h-4!" />
        <div className="text-base font-semibold">Swift Shells</div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeChanger />
        <TopbarUser user={user} />
      </div>
    </header>
  );
}

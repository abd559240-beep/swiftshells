"use client";

import * as React from "react";
import { GalleryVerticalEnd, House, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import SidebarNavMenu from "./SidebarNavMenu";
import { SidebarMenuLink } from "@/types";
import SidebarFooterNavMenu from "./SidebarFooterNavMenu";
import { DEFAULT_AUTH_PATH } from "@/lib/constant/constant";

const menuLinks: Array<SidebarMenuLink> = [
  {
    name: "Dashboard",
    icon: House,
    url: "/dashboard",
  },
];

const footerMenuLinks: Array<SidebarMenuLink> = [
  {
    name: "Settings",
    icon: Settings,
    url: "/dashboard/settings",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Link href={{ pathname: "/" }}>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Swift Shells</span>
              <span className="truncate text-xs">Company</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarNavMenu menuLinks={menuLinks} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooterNavMenu menuLinks={footerMenuLinks} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

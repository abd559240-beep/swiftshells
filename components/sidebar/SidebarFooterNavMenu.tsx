import { SidebarMenuLink } from "@/types";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

export default function SidebarFooterNavMenu({
  menuLinks,
}: {
  menuLinks: Array<SidebarMenuLink>;
}) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuLinks.map((menuLink, idx) => (
        <SidebarMenuItem key={`footer-nav-${idx}`}>
          <SidebarMenuButton
            isActive={pathname === menuLink.url}
            tooltip={menuLink.name}
            asChild
          >
            <Link href={{ pathname: menuLink.url }}>
              <menuLink.icon />
              <span>{menuLink.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

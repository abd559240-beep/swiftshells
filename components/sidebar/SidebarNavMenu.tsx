import { ChevronRight } from "lucide-react";
import { SidebarMenuLink } from "@/types";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function SidebarNavMenu({
  menuLinks,
}: {
  menuLinks: Array<SidebarMenuLink>;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuLinks.map((menuLink, idx) => (
          <NestedNavMenu
            pathname={pathname}
            key={`nav-${idx}`}
            navLink={menuLink}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NestedNavMenu({
  navLink,
  pathname,
}: {
  navLink: SidebarMenuLink;
  pathname: string;
}) {
  if (!navLink?.items?.length) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          isActive={pathname === navLink.url}
          tooltip={navLink.name}
          asChild
        >
          <Link href={{ pathname: navLink.url }}>
            <navLink.icon />
            <span className="truncate">{navLink.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible
      defaultOpen={pathname.startsWith(navLink.url)}
      className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
      asChild
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={pathname.startsWith(navLink.url)}
            className="cursor-pointer"
            tooltip={navLink.name}
          >
            <navLink.icon />
            <span className="truncate">{navLink.name}</span>
            <ChevronRight className="ml-auto transition-transform duration-200" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="mr-0 py-1 pr-0">
            {navLink?.items?.map((subNavLink, idx) => (
              <NestedNavMenu
                key={idx}
                pathname={pathname}
                navLink={subNavLink}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

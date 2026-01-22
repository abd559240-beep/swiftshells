"use client";
import { LogOut, UserRoundCog } from "lucide-react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { DEFAULT_UNAUTH_PATH } from "@/lib/constant/constant";
import { IAuthUser } from "@/types";

export default function TopbarUser({ user }: { user: IAuthUser }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          toast.loading("Logging out...", { id: "sign_out_toast_message" });
        },
        onSuccess: () => {
          toast.success("Logged out successfully", {
            id: "sign_out_toast_message",
          });
          window.location.href = `${DEFAULT_UNAUTH_PATH}?redirect=${pathname}`;
        },
        onError: () => {
          toast.error("Failed to log out. Please try again", {
            id: "sign_out_toast_message",
          });
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserAvatar
            userEmail={user.email}
            imageUrl={user?.image}
            userName={user.name}
            isActive
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <UserAvatar
            className="px-1 py-1.5"
            userEmail={user.email}
            imageUrl={user?.image}
            userName={user.name}
            showDetails
            isActive
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={{ pathname: "/dashboard/settings/profile" }}>
              <UserRoundCog />
              <span>Profile setting</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

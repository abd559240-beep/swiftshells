import { UserRoleEnum, UserType } from "@/lib/prisma-zod/schemas/schemas";
import { LucideIcon } from "lucide-react";

export type SidebarMenuLink = {
  name: string;
  url: string;
  icon: LucideIcon;
  items?: SidebarMenuLink[] | undefined;
};

export interface IAuthUser extends Omit<UserType, "role"> {
  role?: UserRoleEnum | null | undefined;
  banned: boolean | null | undefined;
  banExpires?: Date | null | undefined;
  isActive: boolean;
}

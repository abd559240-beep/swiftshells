import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";
import { UserRoleEnumSchema } from "./prisma-zod/schemas/schemas";

const statement = {
  ...defaultStatements,
} as const;

const ac = createAccessControl(statement);

export const accessControl = {
  ac,
  roles: {
    [UserRoleEnumSchema.Enum.SUPER_ADMIN]: ac.newRole({
      user: ["ban", "create", "delete", "update", "set-role"],
    }),
    [UserRoleEnumSchema.Enum.ADMIN]: ac.newRole({
      user: ["ban", "create", "delete", "update", "set-role"],
    }),
  },
};

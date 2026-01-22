import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps extends React.ComponentPropsWithRef<"div"> {
  imageUrl?: string | null | undefined;
  userName: string;
  userEmail: string;
  showDetails?: boolean;
  isActive?: boolean;
}

export default function UserAvatar({
  className,
  imageUrl,
  userName,
  userEmail,
  showDetails = false,
  isActive = false,
  ...props
}: UserAvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 text-left",
        className,
      )}
      {...props}
    >
      <div className="relative">
        <Avatar className="size-8 rounded-md">
          <AvatarImage src={imageUrl || "/avatars/shadcn.jpg"} alt={userName} />
          <AvatarFallback className="rounded-lg text-xs font-semibold uppercase">
            {userName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        {isActive && (
          <span className="border-background absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-emerald-500">
            <span className="sr-only">Online</span>
          </span>
        )}
      </div>
      {showDetails && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="font-medium">{userName}</span>
          <span className="truncate text-xs">{userEmail}</span>
        </div>
      )}
    </div>
  );
}

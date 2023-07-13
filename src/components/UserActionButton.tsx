import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { signIn, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";

export default function UserActions({
  className,
  user,
}: {
  className?: string;
  user?: User;
}) {
  if (user !== undefined) {
    return (
      <div className={cn("text-white flex", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-10 w-10 flex">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback>{user?.name?.slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <div className={cn("text-white", className)}>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

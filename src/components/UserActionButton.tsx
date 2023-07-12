import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { signIn, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserActions({
  className,
  isAuthenticated,
}: {
  className?: string;
  isAuthenticated: boolean;
}) {
   if (isAuthenticated) {
    return (
      <div className={cn("text-white", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
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

import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserActionButton({
  className,
}: {
  className?: string;
}) {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={cn("text-white", className)}>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className={cn("text-white", className)}>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

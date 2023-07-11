import { signIn, signOut, useSession } from "next-auth/react";

export default function UserActionButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="text-white">
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="text-white">
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "@/app/_components/auth/LoginForm";
import { getServerUser } from "@/lib/server";
import Card from "@/app/_components/Card";
import { getProviders } from "next-auth/react";
import Link from "next/link";

export default async function Login() {
  const user = await getServerUser();
  const cookieStore = cookies();
  const csrfTokenPrefix =
    process.env.NODE_ENV === "production" ? "__Host-" : "";
  const csrfToken = cookieStore.get(
    csrfTokenPrefix + "next-auth.csrf-token"
  )?.value;
  const providers = await getProviders();

  /* Exit conditions*/
  if (user || !csrfToken) {
    redirect("/");
  }

  /* JSX */
  return (
    <div className="relative mx-auto flex max-w-md flex-col justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-center text-h1 font-extrabold">
          Welcome to Feedback Board
        </h1>
        <h3 className="text-lg text-center font-medium text-blue-grey">
          Please login to your account
          <br />
          Either use GitHub or the dummy account: velvetround/test1234
        </h3>
      </div>
      <Card className="flex flex-col justify-center p-8">
        <LoginForm csrfToken={csrfToken} providers={providers} />
      </Card>
      <Link className="mx-auto mt-8 text-sm" href="/">
        Go Back
      </Link>
    </div>
  );
}

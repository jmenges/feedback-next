"use client";

import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import FormFieldGroup from "@/components/feedback-form/FormFieldGroup";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BuiltInProviderType } from "next-auth/providers";
import { useToast } from "@/hooks/useToast";

type LoginFormProps = {
  csrfToken?: string;
  providers?: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

type FormFields = {
  username: string;
  password: string;
};

export default function LoginForm({ csrfToken, providers }: LoginFormProps) {
  const { register, reset, handleSubmit } = useForm<FormFields>();

  const { toast } = useToast();
  const router = useRouter();

  /* Functions */
  const onSubmit = async (data: FormFields) => {
    const signInResult = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl: `${window.location}`,
    });

    if (signInResult?.error != null) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }

    /* Successfully logged in */
    toast({
      title: "Success",
      description: `Logged in as: ${data.username}`,
      duration: 3000,
    });

    router.push("/");
    router.refresh();
  };

  const setMockAccountValues = () => {
    reset({ username: "velvetround", password: "test1234" });
  };

  /* JSX */
  return (
    <>
      <p className="mt-auto text-center font-sans font-semibold">
        Login to your user Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pt-8">
          <FormFieldGroup fieldName="username" title="Username">
            <Input {...register("username")} autoComplete="username"/>
          </FormFieldGroup>
          <FormFieldGroup fieldName="password" title="Password">
            <Input {...register("password")} type="password" autoComplete="current-password"/>
          </FormFieldGroup>
        </div>
        <div className="mt-6 flex w-full items-center gap-2">
          <Button type="button" onClick={() => setMockAccountValues()} variant="interactive">
            Use mock account
          </Button>
          <Button
            type="button"
            className="ml-auto"
            onClick={() => reset()}
            variant="secondary"
          >
            Reset
          </Button>
          <Button type="submit" variant="default" className="flex w-20 gap-2">
            <span>Submit</span>
          </Button>
        </div>
      </form>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="flex w-full items-center">
          <div className="h-[0.15rem] flex-1 bg-grey"></div>
          <div className="mb-[2px] px-2">or</div>
          <div className="h-[0.15rem] flex-1 bg-grey"></div>
        </div>
        {!!providers &&
          Object.values(providers).map((provider) => {
            if (provider.name === "Credentials") return null;
            return (
              <div key={provider.name}>
                <Button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </Button>
              </div>
            );
          })}
      </div>
    </>
  );
}

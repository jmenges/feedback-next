import StoreLastMainRouteInLocalStorage from "@/app/_components/StoreLastMainRouteInLocalStorage";
import SessionContext from "@/context/SessionContext";
import { cn } from "@/lib/utils";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/_components/ui/toaster";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Feedback Board",
  description: "Using Next.js, React, TypeScript, Tailwind CSS, and Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          jost.className,
          "bg-lighter-grey text-xs text-blue-grey tablet:overflow-y-scroll"
        )}
      >
        <div className="max-w-[1110px] tablet:mx-10 tablet:my-12 tablet:text-md desktop:mx-auto desktop:px-12 ">
          <SessionContext>{children}</SessionContext>
        </div>
        <Toaster />
      </body>
      <StoreLastMainRouteInLocalStorage />
    </html>
  );
}

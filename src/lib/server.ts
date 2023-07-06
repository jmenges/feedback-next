import { headers } from "next/headers";

export function genBackLinkServer(currentPath: string) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const referer = headersList.get("referer");
  const path = referer?.split(domain)[1] || "";
  const backPath = path === "" || path.endsWith(currentPath) ? "/" : path;

  return backPath;
}

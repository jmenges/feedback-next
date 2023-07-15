import { useReadLocalStorage } from "usehooks-ts";

export default function useLastMainRoute(): {
  lastMainRoute: string;
} {
  const lastMainRoute = useReadLocalStorage<string>("currentMainRoute") || "/";
  return { lastMainRoute };
}

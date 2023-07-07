import { useReadLocalStorage } from "usehooks-ts";

export default function useLastMainRoute(): { path: string } {
  const path = useReadLocalStorage<string>("lastPath");
  return { path: path || "/" };
}

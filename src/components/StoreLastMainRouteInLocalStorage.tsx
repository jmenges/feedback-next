"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function StoreLastMainRouteInLocalStorage() {
  /**
   * We are storing the lastPath and the currentPath in localStorage
   * When navigating to a new page, the stored currentPath is moved to the lastPath
   * And the currentPath is updated to the new path
   * The change only occurs, if we are in one of the top level routes ("/", "/roadmap")
   */
  const path = usePathname();
  const [currentMainRoute, setCurrentMainRoute] = useLocalStorage(
    "currentMainRoute",
    path
  );
  const [lastMainRoute, setLastMainRoute] = useLocalStorage(
    "lastMainRoute",
    "/"
  );

  useEffect(() => {
    if (path.split("/").length > 2) return;

    setLastMainRoute(currentMainRoute);
    setCurrentMainRoute(path);
  }, [path]);

  return <></>;
}

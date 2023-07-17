"use client";

import BackButton from "@/components/ui/BackButton";
import useLastMainRoute from "@/hooks/useLastMainRoute";
import React from "react";

type Props = {};

export default function BackToMainRouteButton({}: Props) {
  const { lastMainRoute } = useLastMainRoute();

  return <BackButton variant="link" href={lastMainRoute} />;
}

import Card from "@/components/Card";
import React from "react";

type Props = {};

export default function AppCard({}: Props) {
  return (
    <Card className="!pt-[62px] bg-cover bg-app-card-mobile tablet:bg-app-card-tablet desktop:bg-app-card-desktop">
      <h2 className="text-white">Frontend Mentor</h2>
      <p className="text-white opacity-75">Feedback Board</p>
    </Card>
  );
}

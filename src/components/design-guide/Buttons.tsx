import React from "react";
import { Button } from "../ui/button";
import BackButton from "../ui/BackButton";

type Props = {};

export default function Buttons({}: Props) {
  return (
    <div className="space-x-4  py-4 px-4">
      <Button className="" variant="default">
        Primary
      </Button>
      <Button className="" variant="secondary">
        Secondary
      </Button>
      <Button className="" variant="accent">
        Accent
      </Button>
      <Button className="" variant="destructive">
        Descructive
      </Button>

      <BackButton variant="default" />
      <BackButton variant="link" />

    </div>
  );
}

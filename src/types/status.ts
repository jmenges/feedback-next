import { status } from "@/data/status";

export type Status = readonly {
  readonly label: string;
  readonly value: string;
}[];
export type StatusValue = (typeof status)[number]["value"];

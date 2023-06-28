"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

type Props = {};

export default function Inputs({}: Props) {
  return (
    <div className="max-w-[200px] space-y-4  bg-white px-4 py-4">
      <Input className="" />
      <Input aria-invalid className="" />

      <Select>
        <SelectTrigger className="">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

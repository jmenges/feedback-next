import { Input } from "../ui/input";

type Props = {};

export default function Inputs({}: Props) {
  return (
    <div className="space-y-4 max-w-[200px]  bg-white py-4 px-4">
      <Input className="" />
      <Input aria-invalid className="" />


    </div>
  );
}

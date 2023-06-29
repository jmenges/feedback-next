
import BaseActionBar from "@/components/action-bar/BaseActionBar";
import BackButton from "@/components/ui/BackButton";

type Props = {
};

export default function RoadmapActionBar({ }: Props) {
  return (
    <BaseActionBar>
      <div className="flex flex-col items-start justify-start">
        <BackButton />
        <h3 className="text-white tablet:text-h1">Roadmap</h3>
      </div>
    </BaseActionBar>
  );
}

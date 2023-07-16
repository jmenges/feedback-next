
import BaseActionBar from "@/app/_components/action-bar/BaseActionBar";
import BackButton from "@/app/_components/ui/BackButton";

type RoadmapActionBarProps = {
  isAuthenticated?: boolean;
};

export default function RoadmapActionBar({ isAuthenticated}: RoadmapActionBarProps) {
  return (
    <BaseActionBar isAuthenticated={isAuthenticated}>
      <div className="flex flex-col items-start justify-start">
        <BackButton href="/" />
        <h3 className="text-white tablet:text-h1">Roadmap</h3>
      </div>
    </BaseActionBar>
  );
}

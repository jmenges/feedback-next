import Actionbar from "@/components/Actionbar";
import FeedbackItem from "@/components/FeedbackItem";
import RoadmapCounter from "@/components/RoadmapCounter";
import Buttons from "@/components/design-guide/Buttons";
import Inputs from "@/components/design-guide/Inputs";

export default function Home() {
  return (
    <div className="flex gap-6">
      <aside className="w-1/4">
        <RoadmapCounter />
      </aside>
      <main className="space-y-4 flex-grow">
        <header className="mb-4 tablet:mb-6">
          <Actionbar />
        </header>
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
      </main>
    </div>
  );
}

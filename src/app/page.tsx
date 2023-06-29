import Actionbar from "@/components/Actionbar";
import AppCard from "@/components/AppCard";
import FeedbackItem from "@/components/FeedbackItem";
import RoadmapCounter from "@/components/RoadmapCounter";
import TagFilter from "@/components/TagFilter";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-6">
      <aside className="w-full desktop:w-1/4 space-y-6">
        <AppCard />
        <TagFilter />
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

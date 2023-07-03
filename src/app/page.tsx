import Actionbar from "@/components/Actionbar";
import AppCard from "@/components/AppCard";
import FeedbackList from "@/components/FeedbackList";
import RoadmapCounter from "@/components/RoadmapCounter";
import TagFilter from "@/components/TagFilter";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-6">
      <aside className="w-full space-y-6 desktop:w-1/4">
        <AppCard />
        <TagFilter />
        <RoadmapCounter />
      </aside>
      <main className="flex-grow">
        <header className="mb-4 tablet:mb-6">
          <Actionbar />
        </header>
        <FeedbackList />
      </main>
    </div>
  );
}

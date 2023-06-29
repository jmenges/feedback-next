import RoadmapActionBar from "@/components/action-bar/RoadmapActionBar";

export default function Roadmap() {
    return (
      <div className="flex flex-wrap gap-6">
        <main className="space-y-4 flex-grow">
          <header className="mb-4 tablet:mb-6">
            <RoadmapActionBar />
          </header>
        </main>
      </div>
    );
  }
  
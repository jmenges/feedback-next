import ActionBar from "@/components/ActionBar";
import FeedbackItem from "@/components/FeedbackItem";
import Buttons from "@/components/design-guide/Buttons";
import Inputs from "@/components/design-guide/Inputs";

export default function Home() {
  return (
    <>
      <header className="mb-4">
        <ActionBar />
      </header>
      <main className="container space-y-4">
        <FeedbackItem />
        <FeedbackItem />
        <FeedbackItem />
      </main>
    </>
  );
}

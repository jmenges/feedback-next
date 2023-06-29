import AddFeedbackButton from "@/components/ui/AddFeedbackButton";

type Props = {
  children: React.ReactNode;
};

export default function BaseActionBar({ children }: Props) {
  return (
    <div className="flex items-center bg-darker-blue px-6 py-[27px] tablet:rounded-md">
      {children}
      <AddFeedbackButton className="ml-auto" />
    </div>
  );
}

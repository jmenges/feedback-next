import AddFeedbackButton from "@/app/_components/ui/AddFeedbackButton";

type Props = {
  isAuthenticated?: boolean;
  children: React.ReactNode;
};

export default function BaseActionBar({ isAuthenticated, children }: Props) {
  return (
    <div className="flex items-center bg-darker-blue px-6 py-[27px] tablet:rounded-md">
      {children}
      <AddFeedbackButton
        disabled={!isAuthenticated}
        className="ml-auto"
        disabledMessage="Login to add a new feedback"
      />
    </div>
  );
}

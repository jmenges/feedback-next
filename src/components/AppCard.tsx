import Card from "@/components/Card";
import UserActionButton from "@/components/UserActionButton";
import { User } from "next-auth";

type Props = { user?: User };

export default function AppCard({ user }: Props) {
  return (
    <Card className="rounded-none flex w-full bg-app-card-mobile bg-cover p-4 tablet:flex-col tablet:rounded-md tablet:bg-app-card-tablet tablet:p-6 tablet:max-desktop:basis-1/3 desktop:h-44 desktop:bg-app-card-desktop">
      <UserActionButton
        user={user}
        className="ml-auto max-tablet:order-2 max-tablet:mr-12 max-tablet:self-center tablet:mb-auto"
      />
      <div className="max-tablet:order-1">
        <h2 className="text-white">Frontend Mentor</h2>
        <p className="text-white opacity-75">Feedback Board</p>
      </div>
    </Card>
  );
}

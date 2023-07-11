import Card from "@/components/Card";
import UserActionButton from "@/components/UserActionButton";

type Props = {};

export default function AppCard({}: Props) {

  return (
    <Card className="rounded-none w-full bg-app-card-mobile bg-cover p-4 tablet:rounded-md tablet:bg-app-card-tablet tablet:p-6 tablet:!pt-[62px] tablet:max-desktop:basis-1/3 desktop:bg-app-card-desktop">
      <h2 className="text-white">Frontend Mentor</h2>
      <p className="text-white opacity-75">Feedback Board</p>
      <UserActionButton />
    </Card>
  );
}

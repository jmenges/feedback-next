import Card from "@/components/Card";
import UserActionButton from "@/components/UserActionButton";

type Props = {};

export default function AppCard({}: Props) {

  return (
    <Card className="rounded-none w-full flex flex-col bg-app-card-mobile bg-cover p-4 tablet:rounded-md tablet:bg-app-card-tablet tablet:p-6 tablet:max-desktop:basis-1/3 desktop:bg-app-card-desktop">
      <UserActionButton className="ml-auto"/>
      <h2 className="text-white tablet:!pt-[30px]">Frontend Mentor</h2>
      <p className="text-white opacity-75">Feedback Board</p>
    </Card>
  );
}

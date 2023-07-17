import { User } from "@prisma/client";

type Props = {
  author: User;
};

export default function Author({ author: { username, image } }: Props) {
  return (
    <div className="flex items-center">
      {/* Avatar */}
      <img src={image || ""} alt={username} className="mr-4 tablet:mr-8 h-10 w-10 rounded-full" />
      {/* Name and twitter  */}
      <div className="text-xs tablet:text-h4">
        {/* <h4 className="font-bold">{name}</h4> */}
        <p>@{username}</p>
      </div>
    </div>
  );
}

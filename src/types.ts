export type IUser = {
  name: string;
  username: string;
  image: string;
};

export type IComments = IComment[];

export type IComment = {
  id: number;
  content: string;
  user: IUser;
  replies?: IReply[];
};

export type IReply = {
  replyingTo: string;
  content: string;
  user: IUser;
};

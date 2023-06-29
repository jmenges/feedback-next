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

export type IFeedback = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: IComments;
};

// used for creating and editing feedback
export type IFeedbackPartial = Pick<
  IFeedback,
  "id" | "title" | "category" | "status" | "description"
>;

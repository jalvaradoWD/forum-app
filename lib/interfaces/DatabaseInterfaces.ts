import { Topic, Category, Forum, Comment, User } from '@prisma/client';

export interface IUser extends User {
  Topic: ITopic[];
  Comment: IComment[];
}

export interface IForum extends Forum {
  Category: ICategory[];
}

export interface ICategory extends Category {
  Topic: ITopic[];
}

export interface ITopic extends Topic {
  Comment: IComment[];
}

export interface IComment extends Comment {
  author: IUser;
  topic: ITopic;
}

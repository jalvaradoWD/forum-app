export interface IForum {
  id: string;
  name: string;
  description: string;
  Category: ICategory[];
}

export interface ITopic {
  id: string;
  title: string;
  description: string;
  userId: string;
  categoryId: string;
  tags: string[];
}

export interface ICategory {
  id: string;
  name: string;
  forum: string;
  Topic: ITopic[];
}

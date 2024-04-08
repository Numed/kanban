export type IssueType = {
  id: string;
  number: number;
  author: string;
  user: User;
  comments: number;
  title: string;
  assignee: string | null;
  state: string;
  created_at: string;
};

type User = {
  login: string,
};

import { IssueType } from "../types";

export type ActiveSearchType = {
  isActiveSearch: boolean;
  setActiveSearch: (state: boolean) => void;
};

export type IssuesDataType = {
  issuesData: IssueType[];
  setIssuesData: (state: any) => void;
};

import { create } from "zustand";

import { ActiveSearchType, IssuesDataType } from "./types";

export const useActiveSearch = create<ActiveSearchType>((set) => ({
  isActiveSearch: false,
  setActiveSearch: (state) => set(() => ({ isActiveSearch: state })),
}));

export const useIssuesData = create<IssuesDataType>((set) => ({
  issuesData: [],
  setIssuesData: (state) => set(() => ({ issuesData: state })),
}));

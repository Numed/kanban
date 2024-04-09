import { create } from "zustand";

import { ActiveSearchType, IssuesDataType, SearchUrlType } from "./types";

export const useActiveSearch = create<ActiveSearchType>((set) => ({
  isActiveSearch: false,
  setActiveSearch: (state) => set(() => ({ isActiveSearch: state })),
}));

export const useIssuesData = create<IssuesDataType>((set) => ({
  issuesData: [],
  setIssuesData: (state) => set(() => ({ issuesData: state })),
}));

export const useSearchUrl = create<SearchUrlType>((set) => ({
  searchUrl: "",
  setSearchUrl: (state) => set(() => ({ searchUrl: state })),
}));

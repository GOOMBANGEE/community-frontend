import { create } from "zustand";

interface CommunityStore {
  communityState: Community;
  setCommunityState: (state: Partial<Community>) => void;
  resetCommunityState: () => void;
  communityListState: CommunityListState;
  setCommunityListState: (state: CommunityListState) => void;
}

interface CommunityListState {
  communityList: Community[] | [];
  total: number | undefined;
  page: number | undefined;
  totalPage: number | undefined;
}

const initialCommunityState: Community = {
  id: undefined,
  title: undefined,
  description: undefined,
  thumbnail: undefined,
  Post: [],
};

const initialCommunityListState: CommunityListState = {
  communityList: [],
  total: undefined,
  page: undefined,
  totalPage: undefined,
};

export const useCommunityStore = create<CommunityStore>((set) => ({
  communityState: initialCommunityState,
  setCommunityState: (state) =>
    set((prev) => ({ communityState: { ...prev.communityState, ...state } })),
  resetCommunityState: () => set({ communityState: initialCommunityState }),
  communityListState: initialCommunityListState,
  setCommunityListState: (state) => set({ communityListState: state }),
}));

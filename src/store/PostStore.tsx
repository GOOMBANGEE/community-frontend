import { create } from "zustand";

interface PostStore {
  postState: PostState;
  setPostState: (state: Partial<PostState>) => void;
  resetPostState: () => void;
}

export interface PostState {
  communityId: string | undefined;
  id: number;
  status: string;
  title: string;
  nickname: string;
  creator: string;
  content: string;
  view_count: number;
  rate_plus: number;
  rate_minus: number;
  reply_count: number;
  previous_id: number | null;
  next_id: number | null;
  creation_time: Date;
  modification_time: Date;
  password: string;
  mode: string | null;
  target: string | null;
  keyword: string | null;
  page: string | null;
  commentPage: string | null;
}

const initialPostState: PostState = {
  communityId: "",
  id: 0,
  status: "create",
  title: "",
  nickname: "",
  creator: "",
  content: "",
  view_count: 0,
  rate_plus: 0,
  rate_minus: 0,
  reply_count: 0,
  previous_id: 0,
  next_id: 0,
  creation_time: new Date(0),
  modification_time: new Date(0),
  password: "",
  mode: "",
  target: "",
  keyword: "",
  page: "",
  commentPage: "",
};

export const usePostStore = create<PostStore>((set) => ({
  postState: initialPostState,
  setPostState: (state) =>
    set((prev) => ({ postState: { ...prev.postState, ...state } })),
  resetPostState: () => set({ postState: initialPostState }),
}));

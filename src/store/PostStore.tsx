import { create } from "zustand";

interface PostStore {
  postState: PostState;
  setPostState: (state: Partial<PostState>) => void;
  resetPostState: () => void;
  postListState: PostListState;
  setPostListState: (state: PostListState) => void;
}

export interface PostState {
  communityId: string | undefined;
  id: number | undefined;
  status: string | undefined;
  title: string | undefined;
  username: string | undefined;
  creator: string | undefined;
  content: string | undefined;
  viewCount: number | undefined;
  ratePlus: number | undefined;
  rateMinus: number | undefined;
  commentCount: number | undefined;
  previousId: number | undefined;
  nextId: number | undefined;
  creationTime: Date | undefined;
  modificationTime: Date | undefined;
  password: string | undefined;
  mode: string | undefined;
  target: string | undefined;
  keyword: string | undefined;
  page: string | undefined;
  commentPage: string | undefined;
}

interface PostListState {
  postList: Post[] | [];
  total: number | undefined;
  page: number | undefined;
  totalPage: number | undefined;
}

const initialPostState: PostState = {
  communityId: undefined,
  id: undefined,
  status: undefined,
  title: undefined,
  username: undefined,
  creator: undefined,
  content: undefined,
  viewCount: undefined,
  ratePlus: undefined,
  rateMinus: undefined,
  commentCount: undefined,
  previousId: undefined,
  nextId: undefined,
  creationTime: undefined,
  modificationTime: undefined,
  password: undefined,
  mode: undefined,
  target: undefined,
  keyword: undefined,
  page: undefined,
  commentPage: undefined,
};

const initialPostListState: PostListState = {
  postList: [],
  total: undefined,
  page: undefined,
  totalPage: undefined,
};

export const usePostStore = create<PostStore>((set) => ({
  postState: initialPostState,
  setPostState: (state) =>
    set((prev) => ({ postState: { ...prev.postState, ...state } })),
  resetPostState: () => set({ postState: initialPostState }),
  postListState: initialPostListState,
  setPostListState: (state) => set({ postListState: state }),
}));

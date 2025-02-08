import { create } from "zustand";

interface CommentStore {
  commentState: CommentState;
  setCommentState: (state: Partial<CommentState>) => void;
  resetCommentState: () => void;
  commentListState: CommentListState;
  setCommentListState: (state: CommentListState) => void;
}

export interface CommentState {
  communityId: string | undefined;
  postId: string | undefined;
  id: number;
  status: string;
  creator: string;
  username: string;
  password: string;
  content: string;
}

interface CommentListState {
  commentList: Comment[] | [];
  total: number | undefined;
  page: number | undefined;
  totalPage: number | undefined;
}

const initialCommentState: CommentState = {
  communityId: "",
  postId: "",
  id: 0,
  status: "create",
  creator: "",
  username: "",
  password: "",
  content: "",
};

const initialCommentListState: CommentListState = {
  commentList: [],
  total: undefined,
  page: undefined,
  totalPage: undefined,
};

export const useCommentStore = create<CommentStore>((set) => ({
  commentState: initialCommentState,
  setCommentState: (state) =>
    set((prev) => ({ commentState: { ...prev.commentState, ...state } })),
  resetCommentState: () => set({ commentState: initialCommentState }),
  commentListState: initialCommentListState,
  setCommentListState: (state) => set({ commentListState: state }),
}));

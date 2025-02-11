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
  id: number | undefined;
  status: string | undefined;
  creator: string | undefined;
  username: string | undefined;
  password: string | undefined;
  content: string | undefined;
}

interface CommentListState {
  commentList: Comment[] | [];
  total: number | undefined;
  page: number | undefined;
  totalPage: number | undefined;
}

const initialCommentState: CommentState = {
  communityId: undefined,
  postId: undefined,
  id: undefined,
  status: undefined,
  creator: undefined,
  username: undefined,
  password: undefined,
  content: undefined,
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

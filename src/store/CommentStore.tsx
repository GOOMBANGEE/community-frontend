import { create } from "zustand";

interface CommentStore {
  commentState: CommentState;
  setCommentState: (state: Partial<CommentState>) => void;
  resetCommentState: () => void;
}

export interface CommentState {
  communityId: string | undefined;
  postId: string | undefined;
  id: number;
  status: string;
  creator: string;
  nickname: string;
  password: string;
  content: string;
}

const initialCommentState: CommentState = {
  communityId: "",
  postId: "",
  id: 0,
  status: "create",
  creator: "",
  nickname: "",
  password: "",
  content: "",
};

export const useCommentStore = create<CommentStore>((set) => ({
  commentState: initialCommentState,
  setCommentState: (state) =>
    set((prev) => ({ commentState: { ...prev.commentState, ...state } })),
  resetCommentState: () => set({ commentState: initialCommentState }),
}));

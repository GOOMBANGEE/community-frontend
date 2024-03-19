import { create } from "zustand";

interface ReplyStore {
  replyState: ReplyState;
  setReplyState: (state: Partial<ReplyState>) => void;
  resetReplyState: () => void;
}

export interface ReplyState {
  communityId: string | undefined;
  postId: string | undefined;
  id: number;
  status: string;
  creator: string;
  nickname: string;
  password: string;
  content: string;
}

const initialReplyState: ReplyState = {
  communityId: "",
  postId: "",
  id: 0,
  status: "create",
  creator: "",
  nickname: "",
  password: "",
  content: "",
};

export const useReplyStore = create<ReplyStore>((set) => ({
  replyState: initialReplyState,
  setReplyState: (state) =>
    set((prev) => ({ replyState: { ...prev.replyState, ...state } })),
  resetReplyState: () => set({ replyState: initialReplyState }),
}));

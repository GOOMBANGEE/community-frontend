import { create } from "zustand";

interface ReplyStore {
  replyState: ReplyState;
  setReplyState: (state: Partial<ReplyState>) => void;
  resetReplyState: () => void;
}

interface ReplyState {
  communityId: string | undefined;
  postId: string | undefined;
  replyId: number;
  status: string;
  nickname: string;
  password: string;
  content: string;
}

const initialReplyState: ReplyState = {
  communityId: "",
  postId: "",
  replyId: 0,
  status: "create",
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

import { create } from "zustand";

interface UserStore {
  userState: UserState;
  setUserState: (state: Partial<UserState>) => void;
  resetUserState: () => void;
}

interface UserState {
  id: string;
  email: string;
  nickname: string;
  prevPassword: string;
  password: string;
  confirmPassword: string;
  token: string;
}

const initialUserState = {
  id: "",
  email: "",
  nickname: "",
  prevPassword: "",
  password: "",
  confirmPassword: "",
  token: "",
};
export const useUserStore = create<UserStore>((set) => ({
  userState: initialUserState,
  setUserState: (state) =>
    set((prev) => ({ userState: { ...prev.userState, ...state } })),
  resetUserState: () => set({ userState: initialUserState }),
}));

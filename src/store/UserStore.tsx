import { create } from "zustand";

interface UserStore {
  userState: UserState;
  setUserState: (state: Partial<UserState>) => void;
}

interface UserState {
  id: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  token: string;
}

const initialUserState = {
  id: "",
  email: "",
  nickname: "",
  password: "",
  confirmPassword: "",
  token: "",
};
export const useUserStore = create<UserStore>((set) => ({
  userState: initialUserState,
  setUserState: (state) =>
    set((prev) => ({ userState: { ...prev.userState, ...state } })),
}));

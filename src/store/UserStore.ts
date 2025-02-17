import { create } from "zustand";

interface UserStore {
  userState: UserState;
  setUserState: (state: Partial<UserState>) => void;
  resetUserState: () => void;
}

interface UserState {
  id: string | undefined;
  email: string | undefined;
  username: string | undefined;
  newUsername: string | undefined;
  prevPassword: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  token: string | undefined;

  emailError: string | undefined;
  usernameError: string | undefined;
  passwordError: string | undefined;
  codeError: string | undefined;
  loginError: string | undefined;
}

const initialUserState = {
  id: undefined,
  email: undefined,
  username: undefined,
  newUsername: undefined,
  prevPassword: undefined,
  password: undefined,
  confirmPassword: undefined,
  token: undefined,

  emailError: undefined,
  usernameError: undefined,
  passwordError: undefined,
  codeError: undefined,
  loginError: undefined,
};
export const useUserStore = create<UserStore>((set) => ({
  userState: initialUserState,
  setUserState: (state) =>
    set((prev) => ({ userState: { ...prev.userState, ...state } })),
  resetUserState: () => set({ userState: initialUserState }),
}));

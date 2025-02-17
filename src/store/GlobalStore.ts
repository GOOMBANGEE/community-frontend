import { create } from "zustand";

export interface GlobalStore {
  globalState: GlobalState;
  setGlobalState: (state: Partial<GlobalState>) => void;
  resetGlobalState: () => void;
}

interface GlobalState {
  modalMessage: string | undefined;
  redirectName: string | undefined;
  redirectUrl: string | undefined;
  errorMessage: string | undefined;
  loading: boolean;
  open: boolean;
}

const initialGlobalState: GlobalState = {
  modalMessage: undefined,
  redirectName: undefined,
  redirectUrl: undefined,
  errorMessage: undefined,
  loading: true,
  open: false,
};
export const useGlobalStore = create<GlobalStore>((set) => ({
  globalState: initialGlobalState,
  setGlobalState: (state) => {
    set((prev) => ({ globalState: { ...prev.globalState, ...state } }));
  },
  resetGlobalState: () => set({ globalState: initialGlobalState }),
}));

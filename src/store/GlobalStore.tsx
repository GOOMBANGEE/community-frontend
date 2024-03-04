import { create } from "zustand";

export interface GlobalStore {
  globalState: GlobalState;
  setGlobalState: (state: Partial<GlobalState>) => void;
  resetGlobalState: () => void;
}

interface GlobalState {
  modalMessage: string;
  redirectName: string;
  redirectUrl: string;
  errorMessage: string;
  loading: boolean;
  open: boolean;
}

const initialGlobalState: GlobalState = {
  modalMessage: "",
  redirectName: "",
  redirectUrl: "",
  errorMessage: "",
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

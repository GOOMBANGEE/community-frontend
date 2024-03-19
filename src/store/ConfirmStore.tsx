import { create } from "zustand";

export interface ConfirmStore {
  confirmState: ConfirmState;
  setConfirmState: (state: Partial<ConfirmState>) => void;
  resetConfirmState: () => void;
}

interface ConfirmState {
  modalMessage: string;
  confirm: boolean;
}

const initialConfirmState: ConfirmState = {
  modalMessage: "",
  confirm: false,
};
export const useConfirmStore = create<ConfirmStore>((set) => ({
  confirmState: initialConfirmState,
  setConfirmState: (state) => {
    set((prev) => ({ confirmState: { ...prev.confirmState, ...state } }));
  },
  resetConfirmState: () => set({ confirmState: initialConfirmState }),
}));

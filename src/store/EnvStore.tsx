import { create } from "zustand";

const BASE_URL_COMMUNITY = import.meta.env.VITE_BASE_URL_COMMUNITY;
const BASE_URL_USER = import.meta.env.VITE_BASE_URL_USER;
const TIME_DIFFERENCE = import.meta.env.VITE_TIME_DIFFERENCE;

interface EnvStore {
  envState: EnvState;
  setEnvState: (state: Partial<EnvState>) => void;
}

interface EnvState {
  userUrl: string;
  communityUrl: string;
  timeDifference: number;
}

const initialEnvState: EnvState = {
  userUrl: BASE_URL_USER,
  communityUrl: BASE_URL_COMMUNITY,
  timeDifference: TIME_DIFFERENCE,
};

export const useEnvStore = create<EnvStore>((set) => ({
  envState: initialEnvState,
  setEnvState: (state) =>
    set((prev) => ({ envState: { ...prev.envState, ...state } })),
}));

import { create } from "zustand";

const BASE_URL_AUTH = import.meta.env.VITE_BASE_URL_AUTH;
const BASE_URL_USER = import.meta.env.VITE_BASE_URL_USER;
const BASE_URL_COMMUNITY = import.meta.env.VITE_BASE_URL_COMMUNITY;
const BASE_URL_POST = import.meta.env.VITE_BASE_URL_POST;
const BASE_URL_COMMENT = import.meta.env.VITE_BASE_URL_COMMENT;
const TIME_LOCALE = import.meta.env.VITE_TIME_LOCALE;
const TIME_ZONE = import.meta.env.VITE_TIME_ZONE;

interface EnvStore {
  envState: EnvState;
  setEnvState: (state: Partial<EnvState>) => void;
}

interface EnvState {
  authUrl: string;
  userUrl: string;
  communityUrl: string;
  postUrl: string;
  commentUrl: string;
  timeLocale: string;
  timeZone: string;
}

const initialEnvState: EnvState = {
  authUrl: BASE_URL_AUTH,
  userUrl: BASE_URL_USER,
  communityUrl: BASE_URL_COMMUNITY,
  postUrl: BASE_URL_POST,
  commentUrl: BASE_URL_COMMENT,
  timeLocale: TIME_LOCALE,
  timeZone: TIME_ZONE,
};

export const useEnvStore = create<EnvStore>((set) => ({
  envState: initialEnvState,
  setEnvState: (state) =>
    set((prev) => ({ envState: { ...prev.envState, ...state } })),
}));

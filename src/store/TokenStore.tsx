import { create } from "zustand";
import axios from "axios";

interface TokenStore {
  tokenState: TokenState;
  setTokenState: (state: Partial<TokenState>) => void;
  setHeaderAccessToken: (accessToken: string) => void;
}

interface TokenState {
  accessToken: string;
  refreshToken: string;
}

export const useTokenStore = create<TokenStore>((set) => ({
  tokenState: {
    accessToken: "",
    refreshToken: "",
  },
  setTokenState: (state) =>
    set((prev) => ({ tokenState: { ...prev.tokenState, ...state } })),
  setHeaderAccessToken: (accessToken) => {
    set((prev) => ({
      tokenState: { ...prev.tokenState, accessToken: accessToken },
    }));
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  },
}));

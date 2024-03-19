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

const initialTokenState: TokenState = {
  accessToken: "",
  refreshToken: "",
};

export const useTokenStore = create<TokenStore>((set) => ({
  tokenState: initialTokenState,
  setTokenState: (state) =>
    set((prev) => ({ tokenState: { ...prev.tokenState, ...state } })),
  setHeaderAccessToken: (accessToken) => {
    set((prev) => ({
      tokenState: { ...prev.tokenState, accessToken: accessToken },
    }));
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  },
}));

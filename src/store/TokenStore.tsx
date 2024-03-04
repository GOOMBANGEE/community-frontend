import { create } from "zustand";
import axios from "axios";
import { refreshAccessToken } from "../hook/useRefreshAcccessToken.tsx";

const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 24h

interface TokenStore {
  tokenState: TokenState;
  setTokenState: (state: Partial<TokenState>) => void;
  getAccessToken: (responseAccessToken: string) => void;
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
  getAccessToken: (responseAccessToken) => {
    set((prev) => ({
      tokenState: { ...prev.tokenState, accessToken: responseAccessToken },
    }));
    axios.defaults.headers.common["Authorization"] =
      `Bearer ${responseAccessToken}`;
    setTimeout(refreshAccessToken, JWT_EXPIRY_TIME - 60000);
  },
}));

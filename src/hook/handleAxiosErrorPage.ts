import axios from "axios";
import { GlobalStore } from "../store/GlobalStore.ts";

export function handleAxiosErrorPage(
  error: unknown,
  setGlobalState: GlobalStore["setGlobalState"],
) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
    setGlobalState({
      errorMessage: error.response?.data.message,
      loading: false,
    });
  }
}

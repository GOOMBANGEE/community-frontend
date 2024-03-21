import axios from "axios";
import { GlobalStore } from "../store/GlobalStore.tsx";

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

import axios from "axios";
import { GlobalStore } from "../store/GlobalStore.ts";

export function handleAxiosErrorModal(
  error: unknown,
  setGlobalState: GlobalStore["setGlobalState"],
) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
    setGlobalState({ modalMessage: error.response?.data.message });

    setTimeout(() => {
      setGlobalState({ modalMessage: undefined });
    }, 3000);
  }
}

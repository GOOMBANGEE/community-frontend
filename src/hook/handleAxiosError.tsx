import axios from "axios";
import { GlobalStore } from "../store/GlobalStore.tsx";

export function handleAxiosError(
  error: unknown,
  setGlobalState: GlobalStore["setGlobalState"],
) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
    setGlobalState({ modalMessage: error.response?.data.message });

    setTimeout(() => {
      setGlobalState({ modalMessage: "" });
    }, 3000);
  }
}

import axios from "axios";
import { GlobalStore } from "../store/GlobalStore.tsx";

export function handleAxiosError(
  globalState: GlobalStore["globalState"],
  setGlobalState: GlobalStore["setGlobalState"],
  error: unknown,
) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
    setGlobalState({ ...globalState, errorMessage: error.message });

    setTimeout(() => {
      setGlobalState({ ...globalState, errorMessage: "" });
    }, 3000);
  }
}

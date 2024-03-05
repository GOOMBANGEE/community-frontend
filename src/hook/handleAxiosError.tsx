import axios from "axios";
import { GlobalStore } from "../store/GlobalStore.tsx";

export function handleAxiosError(
  error: unknown,
  globalState: GlobalStore["globalState"],
  setGlobalState: GlobalStore["setGlobalState"],
) {
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data);
    setGlobalState({ ...globalState, errorMessage: error.message });

    setTimeout(() => {
      setGlobalState({ ...globalState, errorMessage: "" });
    }, 3000);
  }
}

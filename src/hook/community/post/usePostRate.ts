import { useEnvStore } from "../../../store/EnvStore.ts";
import axios from "axios";
import { usePostStore } from "../../../store/PostStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";

interface Props {
  rate: boolean;
}

export default function usePostRate() {
  const { postState, setPostState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const postRate = async (props: Readonly<Props>) => {
    try {
      const postUrl = envState.postUrl;
      await axios.post(`${postUrl}/${postState.id}/rate`, {
        rate: props.rate,
      });
      if (props.rate) {
        setPostState({
          ratePlus: postState.ratePlus ? postState.ratePlus + 1 : 1,
        });
        return;
      }
      setPostState({
        rateMinus: postState.rateMinus ? postState.rateMinus + 1 : 1,
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postRate };
}

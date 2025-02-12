import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.ts";
import { usePostStore } from "../../../store/PostStore.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";

interface Props {
  password: string;
}

export default function usePostDelete() {
  const { postState, resetPostState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const postDelete = async (props: Props) => {
    try {
      const postUrl = envState.postUrl;
      await axios.delete(
        `${postUrl}/${postState.id}?password=${props.password}`,
      );
      resetPostState();
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postDelete };
}

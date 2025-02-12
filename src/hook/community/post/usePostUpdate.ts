import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.ts";
import { usePostStore } from "../../../store/PostStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";

export default function usePostUpdate() {
  const { postState, resetPostState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const postUpdate = async () => {
    const postUrl = envState.postUrl;
    try {
      await axios.patch(`${postUrl}/${postState.id}`, {
        title: postState.title,
        content: postState.content,
        password: postState.password,
        creator: postState.creator,
      });
      resetPostState();
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postUpdate };
}

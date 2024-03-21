import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function usePostUpdate() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { postState, resetPostState } = usePostStore();
  const { communityId, postId } = useParams();

  const postUpdate = async () => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/update`,
        {
          title: postState.title,
          content: postState.content,
          password: postState.password,
        },
      );
      resetPostState();
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postUpdate };
}

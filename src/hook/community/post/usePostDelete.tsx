import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";

export default function usePostDelete() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { resetPostState } = usePostStore();
  const { communityId, postId } = useParams();

  const postDelete = async (password: string) => {
    try {
      await axios.delete(
        `${envState.communityUrl}/${communityId}/${postId}/delete?password=${password}`,
      );
      resetPostState();
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postDelete };
}

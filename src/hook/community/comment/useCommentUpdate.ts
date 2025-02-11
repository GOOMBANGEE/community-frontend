import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.ts";
import { useCommentStore } from "../../../store/CommentStore.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";

export default function useCommentUpdate() {
  const { commentState } = useCommentStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const commentUpdate = async () => {
    const commentUrl = envState.commentUrl;
    try {
      await axios.patch(`${commentUrl}/${commentState.id}`, {
        content: commentState.content,
        username: commentState.username,
        password: commentState.password,
        creator: commentState.creator,
      });
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { commentUpdate };
}

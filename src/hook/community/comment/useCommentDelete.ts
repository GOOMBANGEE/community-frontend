import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";
import { useCommentStore } from "../../../store/CommentStore.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";

interface Props {
  password: string | undefined;
}

export default function useCommentDelete() {
  const { commentState, resetCommentState } = useCommentStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const commentDelete = async (props: Props) => {
    const commentUrl = envState.commentUrl;
    try {
      await axios.delete(
        `${commentUrl}/${commentState.id}?password=${props.password}`,
      );
      resetCommentState();
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { commentDelete };
}

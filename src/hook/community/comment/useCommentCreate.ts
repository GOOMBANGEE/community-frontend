import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.ts";
import { useCommentStore } from "../../../store/CommentStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";
import { usePostStore } from "../../../store/PostStore.ts";
import { useCommunityStore } from "../../../store/CommunityStore.ts";

export default function useCommentCreate() {
  const { communityState } = useCommunityStore();
  const { postState } = usePostStore();
  const { commentState } = useCommentStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const commentCreate = async () => {
    const commentUrl = envState.commentUrl;
    try {
      await axios.post(commentUrl, {
        communityId: communityState.id,
        postId: postState.id,
        content: commentState.content,
        username: commentState.username,
        password: commentState.password,
      });
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { commentCreate };
}

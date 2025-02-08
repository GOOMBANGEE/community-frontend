import { useEnvStore } from "../../../store/EnvStore.ts";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";
import { useCommentStore } from "../../../store/CommentStore.ts";

export default function useCommentList() {
  const { setCommentListState } = useCommentStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const commentPage = searchParams.get("commentPage");

  const commentList = async () => {
    const commentUrl = envState.commentUrl;
    let apiUrl = `${commentUrl}/${postId}`;

    if (commentPage) {
      apiUrl += `?page=${commentPage}`;
    }

    try {
      const response = await axios.get(apiUrl);
      setCommentListState(response.data);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { commentList };
}

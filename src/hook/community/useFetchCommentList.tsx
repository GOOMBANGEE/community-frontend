import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { CommentList } from "../../page/community/comment/CommentList.tsx";

interface Props {
  setCommentList: (state: CommentList) => void;
}

export default function useFetchCommentList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId } = useParams();
  const [searchParams] = useSearchParams();
  const commentPage = searchParams.get("cp");

  const fetchCommentList = async (props: Props) => {
    let apiUrl = `${envState.communityUrl}/${communityId}/${postId}/comment`;

    if (commentPage) {
      apiUrl += `?cp=${commentPage}`;
    }

    try {
      const response = await axios.get(apiUrl);
      props.setCommentList(response.data);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { fetchCommentList };
}

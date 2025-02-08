import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.ts";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../../store/PostStore.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";

export default function usePostDetail() {
  const { setPostState } = usePostStore();
  const { setGlobalState } = useGlobalStore();
  const { envState } = useEnvStore();
  const { postId } = useParams();

  const postDetail = async () => {
    try {
      const postUrl = envState.postUrl;
      const response = await axios.get(`${postUrl}/${postId}`);
      setPostState(response.data);
      return true;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
      return false;
    }
  };

  return { postDetail };
}

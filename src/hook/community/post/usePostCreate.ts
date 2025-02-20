import axios from "axios";
import { usePostStore } from "../../../store/PostStore.ts";
import { useEnvStore } from "../../../store/EnvStore.ts";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.ts";
import { useGlobalStore } from "../../../store/GlobalStore.ts";
import { useParams } from "react-router-dom";

export default function usePostCreate() {
  const { postState, resetPostState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId } = useParams();

  const postCreate = async () => {
    const postUrl = envState.postUrl;
    try {
      // return: id
      const response = await axios.post(postUrl, {
        communityId: Number(communityId),
        title: postState.title,
        content: postState.content,
        username: postState.username,
        password: postState.password,
      });
      resetPostState();

      return response.data;
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postCreate };
}

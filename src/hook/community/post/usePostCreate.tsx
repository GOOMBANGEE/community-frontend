import axios from "axios";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";

export default function usePostCreate() {
  const { envState } = useEnvStore();
  const { postState, resetPostState } = usePostStore();
  const { communityId } = useParams();

  const postCreate = async () => {
    try {
      await axios.post(`${envState.communityUrl}/${communityId}/create`, {
        title: postState.title,
        content: postState.content,
        nickname: postState.nickname,
        password: postState.password,
      });
      resetPostState();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return { postCreate };
}

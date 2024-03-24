import axios from "axios";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosError } from "../../handleAxiosError.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function usePostCreate() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { postState, resetPostState } = usePostStore();
  const { communityId } = useParams();

  const postCreate = async () => {
    try {
      const response = await axios.post(
        `${envState.communityUrl}/${communityId}/create`,
        {
          title: postState.title,
          content: postState.content,
          nickname: postState.nickname,
          password: postState.password,
        },
      );
      resetPostState();

      return response.data.id;
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { postCreate };
}

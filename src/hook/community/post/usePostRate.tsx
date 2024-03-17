import { useEnvStore } from "../../../store/EnvStore.tsx";
import axios from "axios";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosError } from "../../handleAxiosError.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

export default function usePostRate() {
  const { envState } = useEnvStore();
  const { postState, setPostState } = usePostStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId } = useParams();

  const postRate = async (value: number) => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/rate`,
        {
          value: value,
        },
      );
      if (value === 1) {
        setPostState({ ...postState, rate_plus: postState.rate_plus + 1 });
        return;
      }
      setPostState({ ...postState, rate_minus: postState.rate_minus + 1 });
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  return { postRate };
}

import { useEnvStore } from "../../../store/EnvStore.tsx";
import axios from "axios";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";

interface Props {
  value: number;
}

export default function usePostRate() {
  const { postState, setPostState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId } = useParams();

  const postRate = async (props: Props) => {
    try {
      await axios.post(
        `${envState.communityUrl}/${communityId}/${postId}/rate`,
        {
          value: props.value,
        },
      );
      if (props.value === 1) {
        setPostState({ ...postState, rate_plus: postState.rate_plus + 1 });
        return;
      }
      setPostState({ ...postState, rate_minus: postState.rate_minus + 1 });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postRate };
}

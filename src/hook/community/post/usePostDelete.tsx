import axios from "axios";
import { useEnvStore } from "../../../store/EnvStore.tsx";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import { handleAxiosErrorModal } from "../../handleAxiosErrorModal.tsx";

interface Props {
  password: string;
}

export default function usePostDelete() {
  const { resetPostState } = usePostStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId } = useParams();

  const postDelete = async (props: Props) => {
    try {
      await axios.delete(
        `${envState.communityUrl}/${communityId}/${postId}/delete?password=${props.password}`,
      );
      resetPostState();
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { postDelete };
}

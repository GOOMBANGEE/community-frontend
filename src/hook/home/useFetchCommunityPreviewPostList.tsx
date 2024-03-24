import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

interface Props {
  communityId: number;
  setPreviewPost: (state: Post) => void;
}

export function useFetchCommunityPreviewPostList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const fetchCommunityPreviewPostList = async (props: Props) => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${props.communityId}?p=1&size=10`,
      );
      props.setPreviewPost(response.data.items);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { fetchCommunityPreviewPostList };
}

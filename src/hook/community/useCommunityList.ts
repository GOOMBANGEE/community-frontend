import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";

interface Props {
  setCommunity: (state: Community[]) => void;
}

export function useCommunityList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const communityList = async (props: Props) => {
    try {
      const communityUrl = envState.communityUrl;
      const response = await axios.get(`${communityUrl}?page=1`);
      props.setCommunity(response.data.communityList);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { communityList };
}

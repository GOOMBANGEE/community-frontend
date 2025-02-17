import { useGlobalStore } from "../../store/GlobalStore.ts";
import { useEnvStore } from "../../store/EnvStore.ts";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.ts";
import { useCommunityStore } from "../../store/CommunityStore.ts";

export function useCommunityList() {
  const { setCommunityListState } = useCommunityStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const communityList = async () => {
    try {
      const communityUrl = envState.communityUrl;
      const response = await axios.get(`${communityUrl}?page=1`);
      setCommunityListState(response.data);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { communityList };
}

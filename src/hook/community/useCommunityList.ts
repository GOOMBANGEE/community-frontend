import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
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

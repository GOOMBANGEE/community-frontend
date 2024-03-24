import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { Community } from "../../page/community/CommunityHeader.tsx";

interface Props {
  setCommunity: (state: Community) => void;
}

export function useFetchCommunityList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const fetchCommunityList = async (props: Props) => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/list?page=1&page_size=3`,
      );
      props.setCommunity(response.data.items);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { fetchCommunityList };
}

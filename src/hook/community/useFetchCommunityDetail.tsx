import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { Community } from "../../page/community/CommunityHeader.tsx";

interface Props {
  setCommunity: (state: Community) => void;
}

export default function useFetchCommunityDetail() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId } = useParams();

  const fetchCommunityDetail = async (props: Props) => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}/detail`,
      );
      props.setCommunity(response.data);
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  return { fetchCommunityDetail };
}

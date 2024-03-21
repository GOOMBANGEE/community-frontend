import axios from "axios";
import { useEffect, useState } from "react";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";

export default function useFetchCommunityDetail() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId } = useParams();

  const [community, setCommunity] = useState<Community>({
    id: 0,
    title: "",
    description: "",
    thumbnail: "",
  });

  // communityId를 기반으로 현재 community의 정보를 하나만 가져온다.
  const fetchCommunityDetail = async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}/detail`,
      );
      setCommunity({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        thumbnail: response.data.thumbnail,
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  useEffect(() => {
    void fetchCommunityDetail();
  }, []);

  return community;
}

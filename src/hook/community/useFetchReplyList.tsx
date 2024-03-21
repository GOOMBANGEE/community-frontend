import { useEffect, useState } from "react";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { handleAxiosErrorModal } from "../handleAxiosErrorModal.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";

export default function useFetchReplyList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId } = useParams();
  const [replyList, setReplyList] = useState({
    items: [],
    page: 0,
    page_size: 0,
    total_page: 0,
    prev: 0,
    next: 0,
  });

  const fetchReply = async () => {
    try {
      const page = 1;
      const size = 10;
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}/${postId}/reply?page=${page}&page_size=${size}`,
      );
      setReplyList({
        items: response.data.items,
        page: response.data.page,
        page_size: response.data.page_size,
        total_page: response.data.total_page,
        prev: response.data.prev,
        next: response.data.next,
      });
    } catch (error) {
      handleAxiosErrorModal(error, setGlobalState);
    }
  };

  useEffect(() => {
    void fetchReply();
  }, []);

  return replyList;
}

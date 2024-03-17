import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useEnvStore } from "../../store/EnvStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { handleAxiosError } from "../handleAxiosError.tsx";

export default function useFetchPostList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId } = useParams();
  const [postList, setPostList] = useState({
    items: [],
    page: 0,
    page_size: 0,
    total_page: 0,
    prev: 0,
    next: 0,
  });

  const fetchPostList = async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}`,
      );
      setPostList({
        items: response.data.items,
        page: response.data.page,
        page_size: response.data.page_size,
        total_page: response.data.total_page,
        prev: response.data.prev,
        next: response.data.next,
      });
      setGlobalState({ loading: false });
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  useEffect(() => {
    void fetchPostList();
  }, []);

  return postList.items.sort(
    (a: { id: number }, b: { id: number }) => b.id - a.id,
  );
}

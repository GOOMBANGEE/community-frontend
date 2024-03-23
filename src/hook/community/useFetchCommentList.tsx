import { useEffect, useState } from "react";
import { useEnvStore } from "../../store/EnvStore.tsx";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { handleAxiosError } from "../handleAxiosError.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";

export default function useFetchCommentList() {
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();
  const { communityId, postId } = useParams();
  const [searchParams] = useSearchParams();
  const commentPage = searchParams.get("cp");

  const [commentList, setCommentList] = useState({
    items: [],
    page: 0,
    page_size: 0,
    total_page: 0,
    prev: 0,
    next: 0,
  });

  const fetchCommentList = async () => {
    try {
      const response = await axios.get(
        `${envState.communityUrl}/${communityId}/${postId}/comment?cp=${commentPage}`,
      );
      setCommentList({
        items: response.data.items,
        page: response.data.page,
        page_size: response.data.page_size,
        total_page: response.data.total_page,
        prev: response.data.prev,
        next: response.data.next,
      });
    } catch (error) {
      handleAxiosError(error, setGlobalState);
    }
  };

  useEffect(() => {
    void fetchCommentList();
  }, []);

  return commentList;
}

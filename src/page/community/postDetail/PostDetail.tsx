import useFetchPostDetail from "../../../hook/community/useFetchPostDetail.tsx";
import PostList from "../postList/PostList.tsx";
import ReplyList from "../reply/ReplyList.tsx";
import PostDetailButtons from "./PostDetailButtons.tsx";
import PostDetailContent from "./PostDetailContent.tsx";
import ReplyEditor from "../reply/ReplyEditor.tsx";
import { useEffect } from "react";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import Modal from "../../../component/Modal.tsx";

export default function PostDetail() {
  const { fetchPost } = useFetchPostDetail();
  const { globalState } = useGlobalStore();

  useEffect(() => {
    void fetchPost();
  }, []);

  return (
    <>
      <PostDetailButtons />
      <PostDetailContent />
      <ReplyList />
      <ReplyEditor status={"create"} />
      <PostList />

      {globalState.modalMessage ? <Modal /> : null}
    </>
  );
}

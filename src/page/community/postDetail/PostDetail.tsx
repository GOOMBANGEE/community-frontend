import useFetchPostDetail from "../../../hook/community/useFetchPostDetail.tsx";
import PostList from "../postList/PostList.tsx";
import ReplyList from "../reply/ReplyList.tsx";
import PostDetailButtons from "./PostDetailButtons.tsx";
import PostDetailContent from "./PostDetailContent.tsx";
import ReplyEditor from "../reply/ReplyEditor.tsx";
import { useEffect } from "react";

export default function PostDetail() {
  const { fetchPost } = useFetchPostDetail();
  
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
    </>
  );
}

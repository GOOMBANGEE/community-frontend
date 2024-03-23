import useFetchPostDetail from "../../../hook/community/useFetchPostDetail.tsx";
import PostList from "../postList/PostList.tsx";
import CommentList from "../comment/CommentList.tsx";
import PostDetailButtons from "./PostDetailButtons.tsx";
import PostDetailContent from "./PostDetailContent.tsx";
import CommentEditor from "../comment/CommentEditor.tsx";
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
      <CommentList />
      <CommentEditor status={"create"} />
      <PostList />
    </>
  );
}

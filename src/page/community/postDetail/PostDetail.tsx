import useFetchPostDetail from "../../../hook/community/useFetchPostDetail.tsx";
import PostList from "../postList/PostList.tsx";
import CommentList from "../comment/CommentList.tsx";
import PostDetailButtons from "./PostDetailButtons.tsx";
import PostDetailContent from "./PostDetailContent.tsx";
import CommentEditor from "../comment/CommentEditor.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { fetchPostDetail } = useFetchPostDetail();
  const { postId } = useParams();

  useEffect(() => {
    void fetchPostDetail();
  }, [postId]);

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

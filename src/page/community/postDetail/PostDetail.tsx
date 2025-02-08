import PostList from "../postList/PostList.tsx";
import CommentList from "../comment/CommentList.tsx";
import PostDetailButtons from "./PostDetailButtons.tsx";
import PostDetailContent from "./PostDetailContent.tsx";
import CommentEditor from "../comment/CommentEditor.tsx";
import { useParams } from "react-router-dom";
import usePostDetail from "../../../hook/community/post/usePostDetail.ts";
import { useEffect } from "react";

export default function PostDetail() {
  const { postDetail } = usePostDetail();
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await postDetail();
      if (result) {
        window.scrollTo(0, 0);
      }
    };
    fetchData();
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

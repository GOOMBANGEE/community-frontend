import useFetchPostDetail from "../../../hook/community/useFetchPostDetail.tsx";
import PostList from "../postList/PostList.tsx";
import ReplyList from "../reply/ReplyList.tsx";
import PostDetailButtons from "./PostDetailButtons.tsx";
import PostDetailContent from "./PostDetailContent.tsx";

export default function PostDetail() {
  useFetchPostDetail();

  return (
    <>
      <PostDetailButtons />
      <PostDetailContent />
      <ReplyList />
      {/*<ReplyEditor />*/}
      <PostList />
    </>
  );
}

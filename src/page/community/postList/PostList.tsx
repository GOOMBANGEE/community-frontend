import { useSearchParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.ts";
import useCommunityPostList from "../../../hook/community/useCommunityPostList.ts";
import PostListButtons from "./PostListButtons.tsx";
import { usePostStore } from "../../../store/PostStore.ts";
import { useEffect } from "react";
import PostListSearchBar from "./PostListSearchBar.tsx";
import PostListHeader from "./PostListHeader.tsx";
import PostListPost from "./PostListPost.tsx";
import PaginationBar from "../PaginationBar.tsx";

export default function PostList() {
  const { communityPostList } = useCommunityPostList();
  const { resetPostState, postListState } = usePostStore();
  const { globalState } = useGlobalStore();

  const [searchParams] = useSearchParams();
  const target = searchParams.get("target");
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const paginationProps = {
    type: "post",
    page: postListState.page,
    totalPage: postListState.totalPage,
  };

  useEffect(() => {
    resetPostState();
    communityPostList();
  }, [target, keyword, page]);

  return (
    <>
      {globalState.loading ? null : (
        <div className="lg:bg-customBlack">
          <PostListButtons />
          <PostListHeader />
          {postListState.postList?.map((post: Post) => (
            <PostListPost key={post.id} post={post} />
          ))}
          <PostListButtons />

          <PostListSearchBar />
          <PaginationBar {...paginationProps} />
        </div>
      )}
    </>
  );
}

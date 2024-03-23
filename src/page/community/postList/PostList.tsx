import { useParams, useSearchParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import useFetchPostList from "../../../hook/community/useFetchPostList.tsx";
import PostListPost from "./PostListPost.tsx";
import PostListHeader from "./PostListHeader.tsx";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useEffect, useState } from "react";
import PostListSearchBar from "./PostListSearchBar.tsx";
import PaginationBar from "../PaginationBar.tsx";

export interface PostList {
  items: Post[];
  page: number;
  page_size: number;
  total_page: number;
  prev: number;
  next: number;
}

export default function PostList() {
  const { globalState } = useGlobalStore();
  const { communityId } = useParams();
  const { resetPostState } = usePostStore();
  const { fetchPostList } = useFetchPostList();
  const [searchParams] = useSearchParams();
  const target = searchParams.get("target");
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("p");

  const [postList, setPostList] = useState<PostList>({
    items: [],
    page: 0,
    page_size: 0,
    total_page: 0,
    prev: 0,
    next: 0,
  });
  const data = postList.items.sort(
    (a: { id: number }, b: { id: number }) => b.id - a.id,
  );

  const paginationProps = {
    type: "post",
    currentPage: postList.page,
    totalPage: postList.total_page,
  };

  useEffect(() => {
    resetPostState();
    void fetchPostList({ setPostList });
  }, [target, keyword, page]);

  return (
    <>
      {globalState.loading ? null : (
        <>
          <PostListHeader />
          {data.map((post: Post) => (
            <PostListPost key={post.id} communityId={communityId} post={post} />
          ))}
          <PostListHeader />

          <PostListSearchBar />
          <PaginationBar {...paginationProps} />
        </>
      )}
    </>
  );
}

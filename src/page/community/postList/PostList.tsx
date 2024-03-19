import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import useFetchPostList from "../../../hook/community/useFetchPostList.tsx";
import PostListPost from "./PostListPost.tsx";
import PostListHeader from "./PostListHeader.tsx";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useEffect, useState } from "react";

export interface PostList {
  items: Post[];
  page: number;
  page_size: number;
  total_page: number;
  prev: number;
  next: number;
}

export default function PostList({ best = false }: { best?: boolean }) {
  const { globalState } = useGlobalStore();
  const { communityId } = useParams();
  const { resetPostState } = usePostStore();
  const { fetchPostList } = useFetchPostList();

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

  useEffect(() => {
    resetPostState();
    if (best) {
      void fetchPostList({ best, setPostList });
      return;
    }
    void fetchPostList({ best, setPostList });
  }, []);

  return (
    <>
      {globalState.loading ? null : (
        <>
          <PostListHeader />
          {data.map((post: Post) => (
            <PostListPost key={post.id} communityId={communityId} post={post} />
          ))}
          <PostListHeader />
        </>
      )}
    </>
  );
}

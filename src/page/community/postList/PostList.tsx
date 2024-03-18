import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../../store/GlobalStore.tsx";
import useFetchPostList from "../../../hook/community/useFetchPostList.tsx";
import PostListPost from "./PostListPost.tsx";
import PostListHeader from "./PostListHeader.tsx";
import { usePostStore } from "../../../store/PostStore.tsx";
import { useEffect } from "react";

export default function PostList() {
  const { globalState } = useGlobalStore();
  const { communityId } = useParams();
  const { resetPostState } = usePostStore();

  const data = useFetchPostList();

  useEffect(() => {
    resetPostState();
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

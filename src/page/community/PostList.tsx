import { useParams } from "react-router-dom";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import useFetchPostList from "../../hook/community/useFetchPostList.tsx";
import Post from "./Post.tsx";
import PostListHeader from "./PostListHeader.tsx";

export default function PostList() {
  const { globalState } = useGlobalStore();
  const { communityId } = useParams();

  const data = useFetchPostList();
  
  return (
    <>
      {globalState.loading ? null : (
        <>
          <PostListHeader />
          {data.map((post, index) => (
            <div key={index}>
              <Post key={index} communityId={communityId} post={post} />
              <div className="my-1 border-b-2 border-gray-700"></div>
            </div>
          ))}
          <PostListHeader />
        </>
      )}
    </>
  );
}

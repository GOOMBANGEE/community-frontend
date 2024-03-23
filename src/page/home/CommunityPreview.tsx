import { useNavigate } from "react-router-dom";
import { useFetchCommunityPreviewPostList } from "../../hook/home/useFetchCommunityPreviewPostList.tsx";
import CommunityPreviewPost from "./CommunityPreviewPost.tsx";

interface Props {
  community: Community;
}

// 게시판 하나씩 표시하는 컴포넌트
export default function CommunityPreview({ community }: Readonly<Props>) {
  const navigate = useNavigate();
  const data = useFetchCommunityPreviewPostList(community.id);

  return (
    <div>
      <button
        className="mb-3 w-fit border-b-4 border-emerald-700 text-xl font-extralight"
        onClick={() => {
          navigate(`/community/${community.id}?p=1`);
        }}
      >
        {community.title}
      </button>

      {Array.isArray(data) &&
        data.map((post) => (
          <CommunityPreviewPost
            key={post.id}
            communityId={community.id}
            post={post}
          />
        ))}

      <div className="my-4 border-b-2 border-customGray" />
    </div>
  );
}

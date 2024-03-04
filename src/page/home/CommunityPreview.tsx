import { useNavigate } from "react-router-dom";
import { usePostList } from "../../hook/home/usePostList.tsx";
import PostPreview from "./PostPreview.tsx";

interface CommunityPreviewProp {
  community: Community;
}

// 게시판 하나씩 표시하는 컴포넌트
export default function CommunityPreview({
  community,
}: Readonly<CommunityPreviewProp>) {
  const navigate = useNavigate();
  const data = usePostList(community.id);

  return (
    <div>
      <button
        className="mb-3 w-fit border-b-4 border-emerald-700 text-xl font-extralight"
        onClick={() => {
          navigate(`/community/${community.id}`);
        }}
      >
        {community.title}
      </button>

      {Array.isArray(data) &&
        data.map((post) => (
          <PostPreview key={post.id} communityId={community.id} post={post} />
        ))}

      <div className="border-customGray my-4 border-b-2" />
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useFetchCommunityPreviewPostList } from "../../hook/home/useFetchCommunityPreviewPostList.tsx";
import CommunityPreviewPost from "./CommunityPreviewPost.tsx";
import { useEffect, useState } from "react";

interface Props {
  community: Community;
}

// 게시판 하나씩 표시하는 컴포넌트
export default function CommunityPreview(props: Readonly<Props>) {
  const { fetchCommunityPreviewPostList } = useFetchCommunityPreviewPostList();
  const navigate = useNavigate();
  const [previewPost, setPreviewPost] = useState<Post>();

  useEffect(() => {
    void fetchCommunityPreviewPostList({
      communityId: props.community.id,
      setPreviewPost,
    });
  }, []);

  return (
    <div>
      <button
        className="mb-3 w-fit border-b-4 border-emerald-700 text-xl font-extralight"
        onClick={() => {
          navigate(`/community/${props.community.id}?p=1`);
        }}
      >
        {props.community.title}
      </button>

      {Array.isArray(previewPost) &&
        previewPost.map((post) => (
          <CommunityPreviewPost
            key={post.id}
            communityId={props.community.id}
            post={post}
          />
        ))}

      <div className="my-4 border-b-2 border-customGray" />
    </div>
  );
}

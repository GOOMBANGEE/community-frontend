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
      <div
        className={`mb-4 px-4 py-4 ${props.community.id % 2 === 0 ? "" : "sm:border-r-2 sm:border-customGray"}`}
      >
        <button
          className="mb-3 flex w-full text-xl font-extralight"
          onClick={() => {
            navigate(`/community/${props.community.id}?p=1`);
          }}
        >
          <span className="mr-auto border-b-4 border-emerald-700">
            {props.community.title}
          </span>
          <span className="ml-auto font-bold"> 〉 </span>
        </button>

        {Array.isArray(previewPost) &&
          previewPost.map((post) => (
            <CommunityPreviewPost
              key={post.id}
              communityId={props.community.id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
}

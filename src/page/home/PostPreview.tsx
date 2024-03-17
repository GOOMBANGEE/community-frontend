import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../hook/useTimeFormat.tsx";

interface PostPreviewProp {
  communityId: number;
  post: Post;
}

// 게시판내 게시글 하나씩 표시하는 컴포넌트
export default function PostPreview({
  communityId,
  post,
}: Readonly<PostPreviewProp>) {
  const navigate = useNavigate();
  const { formatTimeDifference } = useTimeFormat();

  // 클릭한 게시글로 이동
  const clickPost = () => {
    navigate(`/community/${communityId}/${post.id}`);
  };

  return (
    <button
      className="mb-1 grid grid-cols-2 gap-2 text-base font-extralight"
      onClick={() => {
        clickPost();
      }}
    >
      <div className="mx-auto">
        {post.title} <span>[{post.reply_count}]</span>
      </div>

      <div className="mt-1 h-fit w-fit items-center rounded bg-gray-700 px-1 text-center text-sm opacity-70">
        {formatTimeDifference(post.creation_time)}
      </div>
    </button>
  );
}

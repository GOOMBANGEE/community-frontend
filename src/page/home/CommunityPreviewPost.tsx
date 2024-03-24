import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../hook/useTimeFormat.tsx";

interface Props {
  communityId: number;
  post: Post;
}

// 게시판내 게시글 하나씩 표시하는 컴포넌트
export default function CommunityPreviewPost({
  communityId,
  post,
}: Readonly<Props>) {
  const navigate = useNavigate();
  const { formatTimeDifference } = useTimeFormat();

  let url = `/community/${communityId}/${post.id}?p=1`;
  if (post.comment_count > 1) {
    const commentPage = Math.ceil(post.comment_count / 10);
    url += `&cp=${commentPage}`;
  }
  const handleClickPost = () => {
    navigate(url);
  };

  return (
    <button
      className="mb-1 grid w-full grid-cols-2 gap-2 text-base font-extralight"
      onClick={() => {
        handleClickPost();
      }}
    >
      <div className="text-left">
        {post.title} <span>[{post.comment_count}]</span>
      </div>

      <div className="ml-auto mt-1 h-fit w-fit items-center rounded bg-gray-700 px-1 text-center text-sm opacity-70">
        {formatTimeDifference(post.creation_time)}
      </div>
    </button>
  );
}

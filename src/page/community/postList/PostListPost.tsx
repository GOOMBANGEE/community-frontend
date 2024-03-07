import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat.tsx";

interface PostProps {
  communityId: string | undefined;
  post: Post;
}

// 게시판내 게시글 하나씩 표시하는 컴포넌트
export default function PostListPost({ communityId, post }: PostProps) {
  const navigate = useNavigate();
  const { formatTimeDifference } = useTimeFormat();

  const handleClickPost = () => {
    navigate(`/community/${communityId}/${post.id}`);
    window.location.href = `/community/${communityId}/${post.id}`;
  };

  return (
    <div
      className="flex-row gap-2 px-3 text-base font-extralight text-white"
      onClick={() => {
        handleClickPost();
      }}
    >
      <div className="">
        <div className="mx-auto mr-2">
          {post.title} <span>[{post.reply_count}]</span>
        </div>
      </div>
      <div className="flex text-sm">
        <div className="mr-auto">{post.nickname}</div>
        <div className="mt-1 flex items-center gap-2">
          <div>{formatTimeDifference(post.creation_time)}</div>

          <div>|</div>
          <div>조회</div>

          <div>|</div>
          <div>추천</div>
        </div>
      </div>
    </div>
  );
}

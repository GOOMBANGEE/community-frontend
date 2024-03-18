import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat.tsx";

interface Props {
  communityId: string | undefined;
  post: Post;
}

// 게시판내 게시글 하나씩 표시하는 컴포넌트
export default function PostListPost({ communityId, post }: Readonly<Props>) {
  const navigate = useNavigate();
  const { formatTimeDifference } = useTimeFormat();

  const handleClickPost = () => {
    navigate(`/community/${communityId}/${post.id}`);
  };

  return (
    <div className="flex-row gap-2 px-3 text-base font-extralight text-white">
      <div className="">
        <div className="mx-auto mr-2">
          <button
            onClick={() => {
              handleClickPost();
            }}
          >
            {post.title} <span>[{post.reply_count}]</span>
          </button>
        </div>
      </div>
      <div className="flex text-sm">
        <div className="mr-auto">{post.nickname}</div>
        <div className="mt-1 flex items-center gap-2">
          <div>{formatTimeDifference(post.creation_time)}</div>

          <div>|</div>
          <div>조회</div>
          <div>{post.view_count}</div>

          <div>|</div>
          <div>추천</div>
          <div>{post.rate_plus - post.rate_minus}</div>
        </div>
      </div>
      <div className="my-1 border-b-2 border-gray-700"></div>
    </div>
  );
}

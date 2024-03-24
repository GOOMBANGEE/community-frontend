import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../hook/useTimeFormat.tsx";

interface Props {
  communityId: number;
  post: Post;
}

// 게시판내 게시글 하나씩 표시하는 컴포넌트
export default function CommunityPreviewPost(props: Readonly<Props>) {
  const { formatTimeDifference } = useTimeFormat();
  const navigate = useNavigate();

  let url = `/community/${props.communityId}/${props.post.id}?p=1`;
  if (props.post.comment_count > 1) {
    const commentPage = Math.ceil(props.post.comment_count / 10);
    url += `&cp=${commentPage}`;
  }

  const handleClickPost = () => {
    navigate(url);
  };

  return (
    <button
      className="mb-1 flex w-full text-base font-extralight"
      onClick={() => {
        handleClickPost();
      }}
    >
      <div className="text-left">
        {props.post.title} <span>[{props.post.comment_count}]</span>
      </div>

      <div className="ml-auto mt-1 h-fit w-fit items-center rounded bg-gray-700 px-1 text-center text-sm opacity-70">
        {formatTimeDifference({ time: props.post.creation_time })}
      </div>
    </button>
  );
}

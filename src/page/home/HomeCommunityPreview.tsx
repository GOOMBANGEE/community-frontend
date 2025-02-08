import { useNavigate } from "react-router-dom";
import useTimeFormat from "../../hook/useTimeFormat.ts";

interface Props {
  index: number;
  community: Community;
}

// 게시판 하나씩 표시하는 컴포넌트
export default function HomeCommunityPreview(props: Readonly<Props>) {
  const { timeFormatDifference } = useTimeFormat();
  const navigate = useNavigate();

  return (
    <div className="mx-2 my-2 border-b-4 border-customGray sm:mx-0 sm:w-full">
      <div
        className={`mb-4 px-4 py-4 ${props.index % 2 === 1 ? "" : "sm:border-r-2 sm:border-customGray"}`}
      >
        <button
          className="mb-3 flex w-full text-xl font-extralight"
          onClick={() => {
            navigate(`/community/${props.community.id}?page=1`);
          }}
        >
          <span className="mr-auto border-b-4 border-emerald-700">
            {props.community.title}
          </span>
          <span className="ml-auto font-bold"> 〉 </span>
        </button>

        {props.community.postList.map((post) => (
          <button
            key={post.id}
            className="mb-1 flex w-full text-base font-extralight"
            onClick={() => {
              navigate(
                `/community/${post.communityId}/${post.id}?page=1&commentPage=1`,
              );
            }}
          >
            <div className="text-left">
              {post.title} <span>[{post.commentCount}]</span>
            </div>

            <div className="ml-auto mt-1 h-fit w-fit items-center rounded bg-gray-700 px-1 text-center text-sm opacity-70">
              {timeFormatDifference({ time: post.creationTime })}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

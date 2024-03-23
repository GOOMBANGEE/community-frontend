import { useNavigate, useSearchParams } from "react-router-dom";
import useTimeFormat from "../../../hook/useTimeFormat.tsx";

interface Props {
  communityId: string | undefined;
  post: Post;
}

// 게시판내 게시글 하나씩 표시하는 컴포넌트
export default function PostListPost({ communityId, post }: Readonly<Props>) {
  const navigate = useNavigate();
  const { formatTimeDifference } = useTimeFormat();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const target = searchParams.get("target");
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("p");

  let url = `/community/${communityId}/${post.id}`;
  const queryParams = [];
  if (mode) {
    queryParams.push(`mode=${mode}`);
  }
  if (target && keyword) {
    queryParams.push(`target=${target}&keyword=${keyword}`);
  }
  url +=
    queryParams.length > 0
      ? `?${queryParams.join("&")}&p=${page}`
      : `?p=${page}`;

  if (post.comment_count > 1) {
    const commentPage = Math.ceil(post.comment_count / 10);
    url += `&cp=${commentPage}`;
  }
  const handleClickPost = () => {
    navigate(url);
  };

  return (
    <>
      <div className="flex-row gap-2 px-3 text-base font-extralight text-white">
        <div className="">
          <div className="mx-auto mr-2">
            <button
              onClick={() => {
                handleClickPost();
              }}
            >
              {post.title} <span>[{post.comment_count}]</span>
            </button>
          </div>
        </div>
        <div className="flex text-sm ">
          <div className="mr-auto flex items-center">
            {post.nickname}
            {post.creator ? (
              <svg
                className="ml-1"
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M8.5 12.5L10.0089 14.0089C10.3526 14.3526 10.5245 14.5245 10.7198 14.5822C10.8914 14.6328 11.0749 14.6245 11.2412 14.5585C11.4305 14.4834 11.5861 14.2967 11.8973 13.9232L16 9M16.3287 4.75855C17.0676 4.77963 17.8001 5.07212 18.364 5.636C18.9278 6.19989 19.2203 6.9324 19.2414 7.67121C19.2623 8.40232 19.2727 8.76787 19.2942 8.85296C19.3401 9.0351 19.2867 8.90625 19.383 9.06752C19.428 9.14286 19.6792 9.40876 20.1814 9.94045C20.6889 10.4778 21 11.2026 21 12C21 12.7974 20.6889 13.5222 20.1814 14.0595C19.6792 14.5912 19.428 14.8571 19.383 14.9325C19.2867 15.0937 19.3401 14.9649 19.2942 15.147C19.2727 15.2321 19.2623 15.5977 19.2414 16.3288C19.2203 17.0676 18.9278 17.8001 18.364 18.364C17.8001 18.9279 17.0676 19.2204 16.3287 19.2414C15.5976 19.2623 15.2321 19.2727 15.147 19.2942C14.9649 19.3401 15.0937 19.2868 14.9325 19.3831C14.8571 19.4281 14.5912 19.6792 14.0595 20.1814C13.5222 20.6889 12.7974 21 12 21C11.2026 21 10.4778 20.6889 9.94047 20.1814C9.40874 19.6792 9.14287 19.4281 9.06753 19.3831C8.90626 19.2868 9.0351 19.3401 8.85296 19.2942C8.76788 19.2727 8.40225 19.2623 7.67121 19.2414C6.93238 19.2204 6.19986 18.9279 5.63597 18.364C5.07207 17.8001 4.77959 17.0676 4.75852 16.3287C4.73766 15.5976 4.72724 15.2321 4.70578 15.147C4.65985 14.9649 4.71322 15.0937 4.61691 14.9324C4.57192 14.8571 4.32082 14.5912 3.81862 14.0595C3.31113 13.5222 3 12.7974 3 12C3 11.2026 3.31113 10.4778 3.81862 9.94048C4.32082 9.40876 4.57192 9.14289 4.61691 9.06755C4.71322 8.90628 4.65985 9.03512 4.70578 8.85299C4.72724 8.7679 4.73766 8.40235 4.75852 7.67126C4.77959 6.93243 5.07207 6.1999 5.63597 5.636C6.19986 5.07211 6.93238 4.77963 7.67121 4.75855C8.40232 4.73769 8.76788 4.72727 8.85296 4.70581C9.0351 4.65988 8.90626 4.71325 9.06753 4.61694C9.14287 4.57195 9.40876 4.32082 9.94047 3.81863C10.4778 3.31113 11.2026 3 12 3C12.7974 3 13.5222 3.31114 14.0595 3.81864C14.5913 4.32084 14.8571 4.57194 14.9325 4.61693C15.0937 4.71324 14.9649 4.65988 15.147 4.70581C15.2321 4.72726 15.5976 4.73769 16.3287 4.75855Z"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            ) : null}
          </div>

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
      </div>
      <div className="my-1 border-b-2 border-gray-700"></div>
    </>
  );
}

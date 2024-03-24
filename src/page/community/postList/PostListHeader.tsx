import { useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../../../store/PostStore.tsx";

export default function PostListHeader() {
  const { resetPostState } = usePostStore();
  const navigate = useNavigate();
  const { communityId } = useParams();

  const handleClickPostList = () => {
    window.location.href = `/community/${communityId}?p=1`;
  };

  const handleClickBest = () => {
    window.location.href = `/community/${communityId}?mode=best&p=1`;
  };

  return (
    <div className="mx-2 my-4 flex text-sm font-light text-white">
      <div className="flex">
        <button
          className="border-2 border-customGray bg-black p-1"
          onClick={() => {
            handleClickPostList();
          }}
        >
          전체글
        </button>
        <button
          className="border-y-2 border-r-2 border-customGray bg-red-600 p-1 "
          onClick={() => {
            handleClickBest();
          }}
        >
          개념글
        </button>
      </div>
      <button
        className="bg-buttonBlack ml-auto border-2 border-customGray p-1"
        onClick={() => {
          navigate(`/community/${communityId}/editor`);
          resetPostState();
        }}
      >
        글쓰기
      </button>
    </div>
  );
}

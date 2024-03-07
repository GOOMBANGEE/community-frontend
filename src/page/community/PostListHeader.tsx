import { useNavigate, useParams } from "react-router-dom";

export default function PostListHeader() {
  const { communityId } = useParams();
  const navigate = useNavigate();

  const handleClickPostList = () => {
    navigate(`/community/${communityId}`);
    window.location.href = `/community/${communityId}`;
  };

  return (
    <>
      <div className="mx-2 mb-4 flex text-sm font-light text-white">
        <div className="flex">
          <div
            className="border-2 border-customGray bg-black p-1"
            onClick={() => {
              handleClickPostList();
            }}
          >
            전체글
          </div>
          <div className="border-y-2 border-r-2 border-customGray bg-red-600 p-1 ">
            개념글
          </div>
        </div>
        <div
          className="ml-auto border-2 border-customGray bg-black p-1"
          onClick={() => {
            navigate(`/community/${communityId}/editor`);
          }}
        >
          글쓰기
        </div>
      </div>
    </>
  );
}

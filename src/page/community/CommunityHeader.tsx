import { useNavigate, useParams } from "react-router-dom";
import useFetchCommunityDetail from "../../hook/community/useFetchCommunityDetail.tsx";

export default function CommunityHeader() {
  const { communityId } = useParams();
  const navigate = useNavigate();

  const data = useFetchCommunityDetail();
  const handleClickCommunityHeader = () => {
    navigate(`/community/${communityId}`);
  };

  return (
    <>
      <div
        className="my-1.5 flex h-10 items-center px-4"
        onClick={() => {
          handleClickCommunityHeader();
        }}
      >
        {data.thumbnail ? (
          <img
            src={data.thumbnail}
            alt="Community Thumbnail"
            className="w-10 rounded-full"
          />
        ) : (
          <div className="h-10 w-10"></div>
        )}

        <div className="ml-3 text-xl font-semibold text-white opacity-80">
          {data.title}
        </div>
      </div>
      <div className="my-1 mb-4 border-b-2 border-customGray"></div>
    </>
  );
}

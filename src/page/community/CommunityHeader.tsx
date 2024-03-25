import { useNavigate, useParams } from "react-router-dom";
import useFetchCommunityDetail from "../../hook/community/useFetchCommunityDetail.tsx";
import { useEffect, useState } from "react";

export interface Community {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

export default function CommunityHeader() {
  const { fetchCommunityDetail } = useFetchCommunityDetail();

  const navigate = useNavigate();
  const { communityId } = useParams();

  const [community, setCommunity] = useState<Community>({
    id: 0,
    title: "",
    description: "",
    thumbnail: "",
  });

  const handleClickCommunityHeader = () => {
    navigate(`/community/${communityId}?p=1`);
    window.location.href = `/community/${communityId}?p=1`;
  };

  useEffect(() => {
    void fetchCommunityDetail({ setCommunity });
  }, []);

  return (
    <>
      <button
        className="my-1.5 mb-1.5 flex h-10 items-center px-4 text-start text-white sm:h-20 sm:items-start lg:my-0"
        onClick={() => {
          handleClickCommunityHeader();
        }}
      >
        {community.thumbnail ? (
          <div className="flex h-full items-center">
            <img
              src={community.thumbnail}
              alt="Community Thumbnail"
              className="w-10 rounded-full sm:w-14"
            />
          </div>
        ) : (
          <div className="h-10 w-10 sm:w-14"></div>
        )}

        <div className="ml-3 flex h-full items-center">
          <div className="flex-row">
            <div className="text-xl font-semibold opacity-80">
              {community.title}
            </div>
            <div className="hidden font-extralight sm:block">
              {community.description}
            </div>
          </div>
        </div>
      </button>
      <div className="my-1 mb-4 border-b-2 border-customGray"></div>
    </>
  );
}

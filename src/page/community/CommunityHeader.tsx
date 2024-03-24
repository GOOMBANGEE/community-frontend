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
      <div
        className="my-1.5 flex h-10 items-center px-4"
        onClick={() => {
          handleClickCommunityHeader();
        }}
      >
        {community.thumbnail ? (
          <img
            src={community.thumbnail}
            alt="Community Thumbnail"
            className="w-10 rounded-full"
          />
        ) : (
          <div className="h-10 w-10"></div>
        )}

        <div className="ml-3 text-xl font-semibold text-white opacity-80">
          {community.title}
        </div>
      </div>
      <div className="my-1 mb-4 border-b-2 border-customGray"></div>
    </>
  );
}

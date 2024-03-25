import { useFetchCommunityList } from "../../hook/home/useFetchCommunityList.tsx";
import CommunityPreview from "./CommunityPreview.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import Modal from "../../component/Modal.tsx";
import { useEffect, useState } from "react";

export default function Home() {
  const { fetchCommunityList } = useFetchCommunityList();
  const { globalState } = useGlobalStore();

  const [community, setCommunity] = useState<Community>();

  useEffect(() => {
    void fetchCommunityList({ setCommunity });
  }, []);

  return (
    <div className="lg:bg-customBlack text-white sm:grid sm:grid-cols-2 sm:p-4 lg:mx-24 lg:h-screen lg:border-x-2 lg:border-customGray">
      {Array.isArray(community) &&
        community.map((community) => (
          <div
            key={community.id}
            className="mx-2 my-2 border-b-4 border-customGray sm:mx-0 sm:w-full"
          >
            <CommunityPreview community={community} />
          </div>
        ))}
      {globalState.modalMessage ? <Modal /> : null}
    </div>
  );
}

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
    <div className="p-4 text-white">
      {Array.isArray(community) &&
        community.map((community) => (
          <CommunityPreview key={community.id} community={community} />
        ))}

      {globalState.modalMessage ? <Modal /> : null}
    </div>
  );
}

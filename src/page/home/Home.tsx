import { useCommunityList } from "../../hook/community/useCommunityList.ts";
import HomeCommunityPreview from "./HomeCommunityPreview.tsx";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import Modal from "../../component/Modal.tsx";
import { useEffect } from "react";
import { useCommunityStore } from "../../store/CommunityStore.ts";

export default function Home() {
  const { communityList } = useCommunityList();
  const { communityListState } = useCommunityStore();
  const { globalState } = useGlobalStore();

  useEffect(() => {
    communityList();
  }, []);

  return (
    <div className="text-white sm:grid sm:grid-cols-2 sm:p-4 lg:mx-24 lg:h-screen lg:border-x-2 lg:border-customGray lg:bg-customBlack">
      {communityListState.communityList.map((community: Community, index) => (
        <HomeCommunityPreview
          key={community.id}
          index={index}
          community={community}
        />
      ))}
      {globalState.modalMessage ? <Modal /> : null}
    </div>
  );
}

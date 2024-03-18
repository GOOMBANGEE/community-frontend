import { useCommunityList } from "../../hook/home/useCommunityList.tsx";
import CommunityPreview from "./CommunityPreview.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import Modal from "../../component/Modal.tsx";

export default function Home() {
  const data = useCommunityList();
  const { globalState } = useGlobalStore();
  return (
    <div className="p-4 text-white">
      {Array.isArray(data) &&
        data.map((community) => (
          <CommunityPreview key={community.id} community={community} />
        ))}
      
      {globalState.modalMessage ? <Modal /> : null}
    </div>
  );
}

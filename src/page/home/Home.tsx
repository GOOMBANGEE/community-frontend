import { useCommunityList } from "../../hook/home/useCommunityList.tsx";
import CommunityPreview from "./CommunityPreview.tsx";

export default function Home() {
  const data = useCommunityList();

  return (
    <div className="p-4 text-white">
      {Array.isArray(data) &&
        data.map((community) => (
          <CommunityPreview key={community.id} community={community} />
        ))}
    </div>
  );
}

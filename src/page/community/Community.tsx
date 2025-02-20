import { Route, Routes } from "react-router-dom";

import PostList from "./postList/PostList.tsx";
import CommunityHeader from "./CommunityHeader.tsx";
import PostEditor from "./PostEditor.tsx";
import PasswordCheck from "./PasswordCheck.tsx";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import Modal from "../../component/Modal.tsx";
import PostDetail from "./postDetail/PostDetail.tsx";

export default function Community() {
  const { globalState } = useGlobalStore();

  return (
    <div className="h-5/6 max-h-full lg:mx-24 lg:h-full lg:bg-customBlack">
      <Routes>
        <Route path="/:communityId/*" element={<CommunityHeader />} />
      </Routes>
      <Routes>
        <Route path="/:communityId/*" element={<PostList />} />
        <Route path="/:communityId/editor" element={<PostEditor />} />
        <Route path="/:communityId/:postId/*" element={<PostDetail />} />
        <Route path="check" element={<PasswordCheck />} />
      </Routes>
      {globalState.modalMessage ? <Modal /> : null}
    </div>
  );
}

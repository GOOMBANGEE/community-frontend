import { Route, Routes } from "react-router-dom";

import PostList from "./postList/PostList.tsx";
import CommunityHeader from "./CommunityHeader.tsx";
import PostEditor from "./PostEditor.tsx";
import PasswordCheck from "./PasswordCheck.tsx";
import { useCommentStore } from "../../store/CommentStore.ts";
import { usePostStore } from "../../store/PostStore.ts";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import Modal from "../../component/Modal.tsx";
import PostDetail from "./postDetail/PostDetail.tsx";

export default function Community() {
  const { postState } = usePostStore();
  const { commentState } = useCommentStore();
  const { globalState } = useGlobalStore();

  return (
    <div className="lg:mx-24 lg:h-screen lg:bg-customBlack">
      <Routes>
        <Route path="/:communityId/*" element={<CommunityHeader />} />
      </Routes>
      <Routes>
        <Route path="/:communityId/*" element={<PostList />} />
        <Route path="/:communityId/editor" element={<PostEditor />} />
        <Route path="/:communityId/:postId/*" element={<PostDetail />} />
        <Route
          path="/:communityId/:postId/check"
          element={<PasswordCheck stateType={postState} />}
        />
        <Route path="/:communityId/:postId/editor" element={<PostEditor />} />
        <Route
          path="/:communityId/:postId/:commentId/check"
          element={<PasswordCheck stateType={commentState} />}
        />
      </Routes>
      {globalState.modalMessage ? <Modal /> : null}
    </div>
  );
}

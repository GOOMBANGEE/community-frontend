import { Route, Routes } from "react-router-dom";

import PostList from "./postList/PostList.tsx";
import CommunityHeader from "./CommunityHeader.tsx";
import PostDetail from "./postDetail/PostDetail.tsx";
import PostEditor from "./PostEditor.tsx";
import PasswordCheck from "./PasswordCheck.tsx";
import { useCommentStore } from "../../store/CommentStore.tsx";
import { usePostStore } from "../../store/PostStore.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import Modal from "../../component/Modal.tsx";

export default function Community() {
  const { globalState } = useGlobalStore();
  const { postState } = usePostStore();
  const { commentState } = useCommentStore();

  return (
    <>
      <Routes>
        <Route path="/:communityId/*" element={<CommunityHeader />} />
      </Routes>
      <Routes>
        <Route path="/:communityId/*" element={<PostList />} />
        <Route path="/:communityId/editor" element={<PostEditor />} />
        <Route path="/:communityId/:postId/*" element={<PostDetail />} />
        <Route
          path="/:communityId/:postId/check"
          element={<PasswordCheck prop={postState} />}
        />
        <Route path="/:communityId/:postId/editor" element={<PostEditor />} />
        <Route
          path="/:communityId/:postId/:commentId/check"
          element={<PasswordCheck prop={commentState} />}
        />
      </Routes>
      {globalState.modalMessage ? <Modal /> : null}
    </>
  );
}

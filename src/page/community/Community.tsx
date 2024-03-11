import { Route, Routes } from "react-router-dom";

import PostList from "./postList/PostList.tsx";
import CommunityHeader from "./CommunityHeader.tsx";
import PostDetail from "./postDetail/PostDetail.tsx";
import PostEditor from "./PostEditor.tsx";

export default function Community() {
  return (
    <>
      <Routes>
        <Route path="/:communityId/*" element={<CommunityHeader />} />
      </Routes>
      <Routes>
        <Route path="/:communityId/*" element={<PostList />} />
        <Route path="/:communityId/editor" element={<PostEditor />} />
        <Route path="/:communityId/:postId/*" element={<PostDetail />} />
        {/*<Route path="/:communityId/:postId/check" element={<PasswordCheck />} />*/}
        {/*  <Route path="/:communityId/:postId/editor" element={<PostEditor />} />*/}
      </Routes>
    </>
  );
}

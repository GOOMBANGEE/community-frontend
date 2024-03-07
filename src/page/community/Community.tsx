import { Route, Routes } from "react-router-dom";

import PostList from "./PostList.tsx";
import CommunityHeader from "./CommunityHeader.tsx";

export default function Community() {
  return (
    <>
      <Routes>
        <Route path="/:communityId/*" element={<CommunityHeader />} />
      </Routes>
      <Routes>
        <Route path="/:communityId/*" element={<PostList />} />
      </Routes>
    </>
  );
}

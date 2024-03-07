import { Route, Routes } from "react-router-dom";
import CommunityHeader from "./CommunityHeader";

export default function Community() {
  return (
    <>
      <Routes>
        <Route path="/:communityId/*" element={<CommunityHeader />} />
      </Routes>
    </>
  );
}

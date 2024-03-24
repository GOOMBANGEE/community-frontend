import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function PostListSearchBar() {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const targetParam = searchParams.get("target");
  const keywordParam = searchParams.get("keyword");

  const [target, setTarget] = useState("all");
  const [keyword, setKeyword] = useState("");

  const handleSearchButton = () => {
    if (targetParam == target && keywordParam == keyword) {
      window.location.reload();
    }

    mode
      ? navigate(
          `/community/${communityId}?mode=${mode}&target=${target}&keyword=${keyword}`,
        )
      : navigate(
          `/community/${communityId}?target=${target}&keyword=${keyword}`,
        );
  };

  return (
    <div className="mx-4 flex border-2 border-customGray bg-black text-center text-sm font-extralight text-white">
      <select
        className="border-r-2 border-customGray bg-black py-1 pl-1"
        value={target}
        onChange={(e) => {
          setTarget(e.target.value);
        }}
      >
        <option value="all">전체</option>
        <option value="title_content">제목/내용</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="nickname">글쓴이</option>
      </select>
      <input
        className="w-3/4 bg-black px-2 py-1"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        className="bg-buttonBlack ml-auto w-10 p-1"
        onClick={() => {
          handleSearchButton();
        }}
      >
        검색
      </button>
    </div>
  );
}

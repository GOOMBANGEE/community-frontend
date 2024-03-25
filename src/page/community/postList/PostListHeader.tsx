export default function PostListHeader() {
  return (
    <div className="mb-2 hidden border-b-4 border-customGray sm:block">
      <div className="mb-2 flex px-3 text-center text-sm font-extralight text-white">
        <div className="mr-2 w-10">번호</div>
        <div className="w-3/5 text-start">제목</div>
        <div className="w-28 text-start">작성자</div>
        <div className="w-16">작성일</div>
        <div className="w-14">조회수</div>
        <div className="w-10">추천</div>
      </div>
    </div>
  );
}

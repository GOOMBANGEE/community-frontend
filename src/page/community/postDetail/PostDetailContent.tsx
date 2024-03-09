import { usePostStore } from "../../../store/PostStore.tsx";
import useTimeFormat from "../../../hook/useTimeFormat.tsx";

export default function PostDetailContent() {
  const { formatTime } = useTimeFormat();
  const { postState } = usePostStore();

  return (
    <>
      <div className="text-white">
        <div className="bg-customGray p-3 text-lg font-light">
          {postState.title}
        </div>

        <div className="flex p-2 text-sm font-extralight">
          <div className="">{postState.nickname}</div>
          <div className="ml-auto flex flex-col">
            <div>추천 | 비추천 | 댓글 {postState.reply_count} | 조회수</div>

            {postState.creation_time !== postState.modification_time ? (
              <div className="">
                작성일 {formatTime(postState.creation_time)}
              </div>
            ) : (
              <div className="">
                <div className="">
                  작성일 {formatTime(postState.creation_time)}
                </div>
                <div className="">
                  수정일 {formatTime(postState.modification_time)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-2 border-b-2 border-customGray"></div>

      <div className="p-2 font-light text-white">
        <div>{postState.content}</div>
      </div>

      <div id="추천 비추천">
        <div></div>
      </div>

      <div className="mb-2 border-b-2 border-customGray"></div>
    </>
  );
}

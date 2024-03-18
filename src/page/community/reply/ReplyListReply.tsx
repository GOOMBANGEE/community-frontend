import useTimeFormat from "../../../hook/useTimeFormat.tsx";
import { useNavigate } from "react-router-dom";
import { useReplyStore } from "../../../store/ReplyStore.tsx";

interface Props {
  communityId: string | undefined;
  postId: string | undefined;
  reply: Reply;
}

export default function ReplyListReply({
  communityId,
  postId,
  reply,
}: Readonly<Props>) {
  const navigate = useNavigate();
  const { replyState, setReplyState, resetReplyState } = useReplyStore();
  const { formatTime } = useTimeFormat();

  // 삭제는 비밀번호 체크페이지로 이동
  const handleDeleteButton = () => {
    setReplyState({
      ...replyState,
      communityId: communityId,
      postId: postId,
      id: reply.id,
      content: reply.content,
      status: "delete",
    });
    navigate(`/community/${communityId}/${postId}/${reply.id}/check`);
  };

  // 수정은 페이지이동하지않고 replyEditor 사용
  const handleEditButton = () => {
    if (replyState.status === "update" && replyState.id === reply.id) {
      resetReplyState();
    } else {
      setReplyState({
        ...replyState,
        communityId: communityId,
        postId: postId,
        id: reply.id,
        nickname: reply.nickname,
        content: reply.content,
        status: "update",
      });
    }
  };

  return (
    <>
      <div className="mx-2 my-3 border-2 border-customGray text-sm font-extralight text-white">
        <div className="flex bg-customGray px-2 py-1">
          <div>{reply.nickname}</div>
          <div className="ml-auto flex items-center text-xs">
            <div>{formatTime(reply.creation_time)}</div>
            <div className="mx-2">|</div>
            {/*삭제*/}
            <button
              onClick={() => {
                handleDeleteButton();
              }}
            >
              삭제
            </button>
            <div className="mx-2">|</div>
            {/*수정*/}
            <button
              onClick={() => {
                handleEditButton();
              }}
            >
              수정
            </button>
          </div>
        </div>
        {/*작성시간과 수정시간이 다른경우 수정됨 표시*/}
        {reply.creation_time === reply.modification_time ? (
          <div className="p-2 text-white">{reply.content}</div>
        ) : (
          <div className="p-2 text-white">
            <span className="mr-1 text-xs">*수정됨</span>
            {reply.content}
          </div>
        )}
      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostState, usePostStore } from "../../store/PostStore.tsx";
import { ReplyState, useReplyStore } from "../../store/ReplyStore.tsx";
import usePasswordCheck from "../../hook/community/usePasswordCheck.tsx";
import usePostDelete from "../../hook/community/post/usePostDelete.tsx";
import useReplyDelete from "../../hook/community/reply/useReplyDelete.tsx";

interface Props {
  prop: PostState | ReplyState;
}

export default function PasswordCheck({ prop }: Props) {
  const [password, setPassword] = useState<string>("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const navigate = useNavigate();

  const { passwordCheckPost, passwordCheckReply } = usePasswordCheck();
  const { postDelete } = usePostDelete();

  const { postState, setPostState } = usePostStore();
  const { replyState } = useReplyStore();

  const isPost = (state: PostState | ReplyState): state is PostState => {
    return "title" in state;
  };
  const isReply = (state: PostState | ReplyState): state is ReplyState => {
    return !("title" in state);
  };

  const handleConfirmPost = async () => {
    if (
      isPost(prop) &&
      (await passwordCheckPost({ postState: prop, password }))
    ) {
      if (prop.status === "update") {
        setPostState({ ...postState, password: password });
        navigate(`/community/${postState.communityId}/${postState.id}/editor`);
        return;
      }
      await postDelete(password);
      navigate(`/community/${postState.communityId}/`);
    }
    setIsPasswordInvalid(true);
  };

  const { replyDelete } = useReplyDelete();
  const handleConfirmReply = async () => {
    if (
      isReply(prop) &&
      (await passwordCheckReply({ replyState: prop, password }))
    ) {
      await replyDelete(password);
      navigate(`/community/${replyState.communityId}/${replyState.postId}`);
      return;
    }

    setIsPasswordInvalid(true);
  };

  return (
    <>
      <div className="m-2 rounded bg-customGray p-4 font-light text-white">
        {isPost(prop) ? (
          <>
            <div className="mb-2 text-xl font-semibold">
              {prop.status === "update" ? "게시물 수정" : "게시물 삭제"}
            </div>
            <div className="mb-6 text-gray-400">{prop.title}</div>
            {prop.status === "delete" ? (
              <div className="mb-4">삭제된 글은 복구할 수 없습니다.</div>
            ) : null}
          </>
        ) : null}

        {isReply(prop) ? (
          <>
            <div className="mb-2 text-xl font-semibold">댓글 삭제</div>
            <div className="mb-4">삭제된 댓글은 복구할 수 없습니다.</div>
          </>
        ) : null}

        <div className="mb-4">비밀번호를 입력해주세요</div>

        <div className="mb-4 flex items-center">
          <div className="mx-4 mr-8">비밀번호</div>
          <input
            type="password"
            className="w-2/3 border-2 border-customGray bg-black p-1"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordInvalid(false);
            }}
          />
        </div>

        {isPasswordInvalid ? (
          <div className="mx-auto mt-2 text-center text-sm text-red-500">
            비밀번호가 일치하지 않습니다.
          </div>
        ) : null}

        <button
          className="ml-auto mr-6 flex w-fit bg-blue-600 p-2 px-3 text-white"
          onClick={() => {
            if (isPost(prop)) {
              void handleConfirmPost();
              return;
            }
            if (isReply(prop)) {
              void handleConfirmReply();
            }
          }}
        >
          확인
        </button>
      </div>
    </>
  );
}

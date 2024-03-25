import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostState, usePostStore } from "../../store/PostStore.tsx";
import { CommentState, useCommentStore } from "../../store/CommentStore.tsx";
import usePasswordCheck from "../../hook/community/usePasswordCheck.tsx";
import usePostDelete from "../../hook/community/post/usePostDelete.tsx";
import useCommentDelete from "../../hook/community/comment/useCommentDelete.tsx";
import { useUserStore } from "../../store/UserStore.tsx";

interface Props {
  stateType: PostState | CommentState;
}

export default function PasswordCheck(props: Readonly<Props>) {
  const { passwordCheckPost, passwordCheckComment } = usePasswordCheck();
  const { postDelete } = usePostDelete();
  const { commentDelete } = useCommentDelete();

  const { postState, setPostState } = usePostStore();
  const { commentState } = useCommentStore();
  const { userState } = useUserStore();

  const [password, setPassword] = useState<string>("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const navigate = useNavigate();
  const { communityId, commentId } = useParams();

  const isPost = (state: PostState | CommentState): state is PostState => {
    return "title" in state;
  };
  const isComment = (
    state: PostState | CommentState,
  ): state is CommentState => {
    return !("title" in state);
  };

  const handleConfirmButton = () => {
    if (isPost(props.stateType)) {
      void handleConfirmPost();
      return;
    }
    if (isComment(props.stateType)) {
      void handleConfirmComment();
    }
  };

  const handleConfirmPost = async () => {
    if (isPost(props.stateType)) {
      if (postState.creator === userState.id) {
        await postDelete({ password });
        navigate(-2);
        return;
      }

      if (await passwordCheckPost({ postState: props.stateType, password })) {
        if (props.stateType.status === "update") {
          setPostState({ ...postState, password: password });
          navigate(`/community/${communityId}/${postState.id}/editor`);
          return;
        }
        await postDelete({ password });
        navigate(-2);
        return;
      }
    }
    setIsPasswordInvalid(true);
  };

  const handleConfirmComment = async () => {
    if (isComment(props.stateType)) {
      if (
        commentState.creator === userState.id ||
        (await passwordCheckComment({
          commentState: props.stateType,
          password,
        }))
      ) {
        await commentDelete({ password });
        navigate(-1);
        return;
      }
    }
    setIsPasswordInvalid(true);
  };

  return (
    <div className="m-2 rounded-lg bg-customGray p-4 font-light text-white">
      {isPost(props.stateType) ? (
        <>
          <div className="mb-2 text-xl font-semibold">
            {props.stateType.status === "update"
              ? "게시물 수정"
              : "게시물 삭제"}
          </div>
          <div className="mb-6 text-gray-400">{props.stateType.title}</div>
          {props.stateType.status === "delete" ? (
            <div className="mb-4">삭제된 글은 복구할 수 없습니다.</div>
          ) : null}
        </>
      ) : null}

      {isComment(props.stateType) ? (
        <>
          <div className="mb-2 text-xl font-semibold">댓글 삭제</div>
          <div className="mb-4">삭제된 댓글은 복구할 수 없습니다.</div>
        </>
      ) : null}

      {(!commentId && postState.creator === userState.id) ||
      (commentId && commentState.creator === userState.id) ? null : (
        <>
          <div className="mb-4 flex items-center">
            <div className="mx-4 mr-8">비밀번호</div>
            <input
              type="password"
              className="w-2/3 border-2 border-customGray bg-black p-1 sm:ml-auto sm:mr-6"
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
        </>
      )}

      <button
        className={`ml-auto mr-6 flex w-fit p-2 px-3 text-white ${props.stateType.status === "delete" ? "bg-red-500" : "bg-blue-600"}`}
        onClick={() => {
          handleConfirmButton();
        }}
      >
        {props.stateType.status === "delete" ? "삭제" : "확인"}
      </button>
    </div>
  );
}

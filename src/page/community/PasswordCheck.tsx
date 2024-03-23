import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostState, usePostStore } from "../../store/PostStore.tsx";
import { CommentState, useCommentStore } from "../../store/CommentStore.tsx";
import usePasswordCheck from "../../hook/community/usePasswordCheck.tsx";
import usePostDelete from "../../hook/community/post/usePostDelete.tsx";
import useCommentDelete from "../../hook/community/comment/useCommentDelete.tsx";
import { useUserStore } from "../../store/UserStore.tsx";

interface Props {
  prop: PostState | CommentState;
}

export default function PasswordCheck({ prop }: Readonly<Props>) {
  const [password, setPassword] = useState<string>("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const navigate = useNavigate();
  const { communityId, commentId } = useParams();

  const { passwordCheckPost, passwordCheckComment } = usePasswordCheck();
  const { postDelete } = usePostDelete();

  const { postState, setPostState } = usePostStore();
  const { commentState } = useCommentStore();
  const { userState } = useUserStore();

  const isPost = (state: PostState | CommentState): state is PostState => {
    return "title" in state;
  };
  const isComment = (
    state: PostState | CommentState,
  ): state is CommentState => {
    return !("title" in state);
  };

  const handleConfirmPost = async () => {
    if (isPost(prop)) {
      if (postState.creator === userState.id) {
        await postDelete(password);
        navigate(`/community/${communityId}/`);
        return;
      }

      if (await passwordCheckPost({ postState: prop, password })) {
        if (prop.status === "update") {
          setPostState({ ...postState, password: password });
          navigate(`/community/${communityId}/${postState.id}/editor`);
          return;
        }
        await postDelete(password);
        navigate(`/community/${communityId}/`);
        return;
      }
    }
    setIsPasswordInvalid(true);
  };

  const { commentDelete } = useCommentDelete();
  const handleConfirmComment = async () => {
    if (isComment(prop)) {
      if (
        commentState.creator === userState.id ||
        (await passwordCheckComment({
          commentState: prop,
          password,
        }))
      ) {
        await commentDelete(password);
        navigate(`/community/${communityId}/${commentState.postId}`);
        return;
      }
    }
    setIsPasswordInvalid(true);
  };

  return (
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

      {isComment(prop) ? (
        <>
          <div className="mb-2 text-xl font-semibold">댓글 삭제</div>
          <div className="mb-4">삭제된 댓글은 복구할 수 없습니다.</div>
        </>
      ) : null}

      {(!commentId && postState.creator === userState.id) ||
      (commentId && commentState.creator === userState.id) ? null : (
        <>
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
        </>
      )}

      <button
        className="ml-auto mr-6 flex w-fit bg-blue-600 p-2 px-3 text-white"
        onClick={() => {
          if (isPost(prop)) {
            void handleConfirmPost();
            return;
          }
          if (isComment(prop)) {
            void handleConfirmComment();
          }
        }}
      >
        확인
      </button>
    </div>
  );
}

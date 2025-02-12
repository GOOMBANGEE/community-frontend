import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/PostStore.ts";
import { useCommentStore } from "../../store/CommentStore.ts";
import usePostDelete from "../../hook/community/post/usePostDelete.ts";
import useCommentDelete from "../../hook/community/comment/useCommentDelete.ts";
import { useUserStore } from "../../store/UserStore.ts";
import { useCommunityStore } from "../../store/CommunityStore.ts";
import usePostPasswordCheck from "../../hook/community/post/usePostPasswordCheck.ts";

export default function PasswordCheck() {
  const { postPasswordCheck } = usePostPasswordCheck();
  const { postDelete } = usePostDelete();
  const { commentDelete } = useCommentDelete();

  const { communityState } = useCommunityStore();
  const { postState, setPostState } = usePostStore();
  const { commentState } = useCommentStore();
  const { userState } = useUserStore();

  const [password, setPassword] = useState<string>("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfirmButton = () => {
    if (postState.status) {
      void handleConfirmPost();
      return;
    }
    if (commentState.status) {
      void handleConfirmComment();
    }
  };

  const handleConfirmPost = async () => {
    // 작성자 본인이 쓴 글에서 PasswordCheck에 방문하게되는 경우는 postDelete 요청을 할때
    if (postState.creator === userState.id) {
      await postDelete({ password });
      navigate(`/community/${communityState.id}&page=1`, { replace: true });
      return;
    }

    // 익명게시글에서 PasswordCheck 방문시 -> password check -> postState.status에 따라서 update, delete실행
    if (await postPasswordCheck({ password })) {
      if (postState.status === "update") {
        setPostState({ ...postState, password: password });
        navigate(`/community/${communityState.id}/editor`, { replace: true });
        return;
      }
      await postDelete({ password });
      navigate(-2);
      return;
    }

    setIsPasswordInvalid(true);
  };

  const handleConfirmComment = async () => {
    if (commentState.status) {
      if (await commentDelete({ password })) {
        navigate(-1);
        return;
      }
    }
    setIsPasswordInvalid(true);
  };

  return (
    <div className="m-2 rounded-lg bg-customGray p-4 font-light text-white">
      {postState.status ? (
        <>
          <div className="mb-2 text-xl font-semibold">
            {postState.status === "update" ? "게시물 수정" : "게시물 삭제"}
          </div>
          <div className="mb-6 text-gray-400">{postState.title}</div>

          <div
            className={`mb-4 ${postState.status === "delete" ? "" : "hidden"}`}
          >
            삭제된 글은 복구할 수 없습니다.
          </div>
        </>
      ) : null}

      {commentState.status ? (
        <>
          <div className="mb-2 text-xl font-semibold">댓글 삭제</div>
          <div className="mb-4">삭제된 댓글은 복구할 수 없습니다.</div>
        </>
      ) : null}

      {(!commentState.id && postState.creator === userState.id) ||
      (commentState.id && commentState.creator === userState.id) ? null : (
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
        className={`ml-auto mr-6 flex w-fit p-2 px-3 text-white ${commentState.status === "delete" ? "bg-red-500" : "bg-blue-600"}`}
        onClick={() => {
          handleConfirmButton();
        }}
      >
        {commentState.status === "delete" ? "삭제" : "확인"}
      </button>
    </div>
  );
}

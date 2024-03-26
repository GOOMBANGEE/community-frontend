import { useState } from "react";
import { useCommentStore } from "../../../store/CommentStore.tsx";
import useRenderErrorMessage from "../../../hook/useRenderErrorMessage.tsx";
import useValidateComment from "../../../hook/community/comment/useValidateComment.tsx";
import useCommentCreate from "../../../hook/community/comment/useCommentCreate.tsx";
import usePasswordCheck from "../../../hook/community/usePasswordCheck.tsx";
import useCommentUpdate from "../../../hook/community/comment/useCommentUpdate.tsx";
import { useTokenStore } from "../../../store/TokenStore.tsx";
import { useUserStore } from "../../../store/UserStore.tsx";

interface Props {
  status: string;
}

export default function CommentEditor(props: Readonly<Props>) {
  const { commentCreate } = useCommentCreate();
  const { commentUpdate } = useCommentUpdate();
  const { passwordCheckComment } = usePasswordCheck();
  const { isInvalidNickname, isInvalidPassword, isInvalidContent } =
    useValidateComment();

  const { commentState, setCommentState } = useCommentStore();
  const { userState } = useUserStore();
  const { tokenState } = useTokenStore();

  // textarea에 포커싱 되어있을때만 "작성"버튼 표시
  const [isFocusTextArea, setIsFocusTextArea] = useState<boolean>(false);
  const [validateState, setValidateState] = useState<ValidateComment>({
    nicknameError: "",
    passwordError: "",
    contentError: "",
    invalidPasswordError: "",
  });

  const handleCommentButton = async () => {
    // 유효성 검사
    if (
      !tokenState.accessToken &&
      props.status === "create" &&
      isInvalidNickname({
        value: commentState.nickname,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      !tokenState.accessToken &&
      isInvalidPassword({
        value: commentState.password,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      isInvalidContent({
        value: commentState.content,
        setValidateState,
      })
    ) {
      return;
    }

    if (props.status !== "update") {
      await commentCreate();
      window.location.reload();
      return;
    }
    // 유효성검사 종료

    // comment 작성자가 user와 동일한 경우
    // passwordCheckComment (비밀번호 검증) 통과한 경우 commentUpdate 실행 후 페이지 리로드
    if (
      commentState.creator === userState.id ||
      (await passwordCheckComment({
        commentState: commentState,
        password: commentState.password,
      }))
    ) {
      await commentUpdate();
      window.location.reload();
      return;
    }
    // 비밀번호 검증 통과하지 못한경우 textarea 하단 오류메시지 표시
    setValidateState({
      ...validateState,
      invalidPasswordError: "비밀번호를 다시 확인해주세요",
    });
  };

  return (
    <div className="pb-2 sm:px-4 lg:bg-customBlack">
      <div className="mx-2 rounded border-2 border-customGray">
        <div className="flex items-center border-b-2 border-customGray text-white">
          <div className="text-extralight border-r-2 border-customGray p-2 text-xs">
            댓글 작성
          </div>

          {tokenState.accessToken ? (
            <div className="p-2 text-gray-400">{userState.nickname}</div>
          ) : (
            <div className="flex">
              <input
                type="text"
                placeholder="닉네임"
                className="border-r-2 border-customGray bg-transparent p-2 text-sm font-light text-white"
                onChange={(e) => {
                  setCommentState({
                    ...commentState,
                    nickname: e.target.value,
                  });
                  setValidateState({
                    ...validateState,
                    nicknameError: "",
                  });
                }}
                defaultValue={
                  props.status === "update" ? commentState.nickname : ""
                }
                readOnly={props.status === "update"}
              />
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full bg-transparent p-2 text-sm font-light text-white"
                onChange={(e) => {
                  setCommentState({
                    ...commentState,
                    password: e.target.value,
                  });
                  setValidateState({
                    ...validateState,
                    passwordError: "",
                  });
                }}
              />
            </div>
          )}
        </div>

        <textarea
          className="w-full resize-none overflow-hidden	bg-transparent p-2 text-white"
          onFocus={() => {
            setIsFocusTextArea(true);
          }}
          onChange={(e) => {
            setCommentState({
              ...commentState,
              content: e.target.value,
            });
            setValidateState({
              ...validateState,
              contentError: "",
            });
          }}
          defaultValue={props.status === "update" ? commentState.content : ""}
          style={{ outline: "none" }}
        ></textarea>

        {isFocusTextArea ? (
          <button
            className="justify-item-end mb-2 ml-auto mr-2 flex rounded border-2 border-customGray p-1 px-6 font-extralight text-white"
            onClick={() => {
              void handleCommentButton();
            }}
          >
            작성
          </button>
        ) : null}
      </div>

      {useRenderErrorMessage(validateState.nicknameError)}
      {useRenderErrorMessage(validateState.passwordError)}
      {useRenderErrorMessage(validateState.invalidPasswordError)}
      {useRenderErrorMessage(validateState.contentError)}
    </div>
  );
}

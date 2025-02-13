import { useState } from "react";
import { useCommentStore } from "../../../store/CommentStore.ts";
import useRenderErrorMessage from "../../../hook/useRenderErrorMessage.tsx";
import useValidateComment from "../../../hook/community/comment/useValidateComment.ts";
import useCommentCreate from "../../../hook/community/comment/useCommentCreate.ts";
import useCommentUpdate from "../../../hook/community/comment/useCommentUpdate.ts";
import { useTokenStore } from "../../../store/TokenStore.ts";
import { useUserStore } from "../../../store/UserStore.ts";

interface Props {
  status: string;
}

interface ValidateComment {
  usernameError: string | undefined;
  passwordError: string | undefined;
  contentError: string | undefined;
  invalidPasswordError: string | undefined;
}

export default function CommentEditor(props: Readonly<Props>) {
  const { commentCreate } = useCommentCreate();
  const { commentUpdate } = useCommentUpdate();
  const { isInvalidUsername, isInvalidPassword, isInvalidContent } =
    useValidateComment();

  const { commentState, setCommentState } = useCommentStore();
  const { userState } = useUserStore();
  const { tokenState } = useTokenStore();

  // textarea에 포커싱 되어있을때만 "작성"버튼 표시
  const [isFocusTextArea, setIsFocusTextArea] = useState<boolean>(false);
  const [validateState, setValidateState] = useState<ValidateComment>({
    usernameError: undefined,
    passwordError: undefined,
    contentError: undefined,
    invalidPasswordError: undefined,
  });

  const handleCommentButton = async () => {
    // 유효성 검사
    if (
      !tokenState.accessToken &&
      props.status === "create" &&
      isInvalidUsername({
        value: commentState.username,
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
    // 유효성검사 종료

    // create
    if (props.status === "create") {
      if (await commentCreate()) {
        window.location.reload();
        return;
      }
    }

    // update
    if (props.status === "update") {
      if (await commentUpdate()) {
        window.location.reload();
        return;
      }
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
            <div className="p-2 text-gray-400">{userState.username}</div>
          ) : (
            <div className="flex">
              <input
                type="text"
                placeholder="이름"
                className="border-r-2 border-customGray bg-transparent p-2 text-sm font-light text-white"
                onChange={(e) => {
                  setCommentState({
                    ...commentState,
                    username: e.target.value,
                  });
                  setValidateState({
                    ...validateState,
                    usernameError: "",
                  });
                }}
                defaultValue={
                  props.status === "update" ? commentState.username : ""
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
              handleCommentButton();
            }}
          >
            작성
          </button>
        ) : null}
      </div>

      {useRenderErrorMessage(validateState.usernameError)}
      {useRenderErrorMessage(validateState.passwordError)}
      {useRenderErrorMessage(validateState.invalidPasswordError)}
      {useRenderErrorMessage(validateState.contentError)}
    </div>
  );
}

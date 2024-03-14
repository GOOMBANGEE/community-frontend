import { useState } from "react";
import { useReplyStore } from "../../../store/ReplyStore.tsx";
import useRenderErrorMessage from "../../../hook/user/useRenderErrorMessage.tsx";
import useValidateReply from "../../../hook/community/reply/useValidateReply.tsx";
import useReplyCreate from "../../../hook/community/reply/useReplyCreate.tsx";
import usePasswordCheck from "../../../hook/community/usePasswordCheck.tsx";
import useReplyUpdate from "../../../hook/community/reply/useReplyUpdate.tsx";

interface Props {
  status: string;
}

export default function ReplyEditor(prop: Props) {
  const { replyState, setReplyState } = useReplyStore();
  const { isNicknameValid, isPasswordValid, isContentValid } =
    useValidateReply();
  const [isFocusTextArea, setIsFocusTextArea] = useState<boolean>(false);
  const [validateState, setValidateState] = useState<ValidateReply>({
    nicknameError: "",
    passwordError: "",
    contentError: "",
    invalidPasswordError: "",
  });

  const { replyCreate } = useReplyCreate();
  const { replyUpdate } = useReplyUpdate();
  const { passwordCheckReply } = usePasswordCheck();
  const handleReplyButton = async () => {
    if (
      prop.status === "create" &&
      !isNicknameValid({
        value: replyState.nickname,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      !isPasswordValid({
        value: replyState.password,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      !isContentValid({
        value: replyState.content,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }

    if (prop.status !== "update") {
      await replyCreate();
      window.location.reload();
      return;
    }
    if (
      await passwordCheckReply({ replyState, password: replyState.password })
    ) {
      await replyUpdate();
      window.location.reload();
      return;
    }
    setValidateState({
      ...validateState,
      invalidPasswordError: "비밀번호를 다시 확인해주세요",
    });
  };

  return (
    <>
      <div className="mx-2 rounded border-2 border-customGray">
        <div className="flex border-b-2 border-customGray">
          <input
            type="text"
            placeholder="닉네임"
            className="border-r-2 border-customGray bg-transparent p-2 text-sm font-light text-white"
            onChange={(e) => {
              setReplyState({
                ...replyState,
                nickname: e.target.value,
              });
              setValidateState({
                ...validateState,
                nicknameError: "",
              });
            }}
            defaultValue={prop.status === "update" ? replyState.nickname : ""}
            readOnly={prop.status === "update"}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full bg-transparent p-2 text-sm font-light text-white"
            onChange={(e) => {
              setReplyState({
                ...replyState,
                password: e.target.value,
              });
              setValidateState({
                ...validateState,
                passwordError: "",
              });
            }}
          />
        </div>

        <textarea
          className="w-full resize-none overflow-hidden	bg-transparent p-2 text-white"
          onFocus={() => {
            setIsFocusTextArea(true);
          }}
          onChange={(e) => {
            setReplyState({
              ...replyState,
              content: e.target.value,
            });
            setValidateState({
              ...validateState,
              contentError: "",
            });
          }}
          defaultValue={prop.status === "update" ? replyState.content : ""}
          style={{ outline: "none" }}
        ></textarea>
        {isFocusTextArea ? (
          <button
            className="justify-item-end mb-2 ml-auto mr-2 flex rounded border-2 border-customGray p-1 px-6 font-extralight text-white"
            onClick={() => {
              void handleReplyButton();
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
    </>
  );
}

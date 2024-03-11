import Modal from "../../component/Modal.tsx";
import { useRegisterActivate } from "../../hook/user/useRegisterActivate.tsx";
import { FormEvent, useState } from "react";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import { useUserStore } from "../../store/UserStore.tsx";
import useValidateUser from "../../hook/user/useValidateUser.tsx";
import useEmailSend from "../../hook/user/useEmailSend.tsx";
import useRenderErrorMessage from "../../hook/user/useRenderErrorMessage.tsx";

export default function RegisterActivate() {
  const { globalState } = useGlobalStore();
  const { userState } = useUserStore();
  const [verificationCode, setVerificationCode] = useState<string>("");

  const [validateState, setValidateState] = useState<ValidateUser>({
    codeError: "",
  });

  const { checkCodeLength } = useValidateUser();
  const { registerActivate } = useRegisterActivate();
  const { emailSend } = useEmailSend();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !checkCodeLength({
        value: verificationCode,
        length: 6,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }

    if (
      !(await registerActivate({
        verificationCode,
        validateState,
        setValidateState,
      }))
    ) {
      return;
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    await emailSend();
  };

  return (
    <div>
      <div className="mx-auto flex w-5/6 flex-col">
        <div className="my-6 font-semibold">코드를 입력해 주세요</div>

        <form className="flex w-full flex-col" onSubmit={handleSubmit}>
          <div className="mb-1 text-start">이메일</div>
          <input
            className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:opacity-90"
            defaultValue={userState.email}
            disabled
          />

          <div className="mb-1 text-start">코드</div>
          <input
            type="number"
            placeholder="코드 입력"
            className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
            onChange={(e) => {
              setVerificationCode(e.target.value);
              setValidateState({
                ...validateState,
                codeError: "",
              });
            }}
          />

          <button
            type="submit"
            className="w- mx-auto mb-2 mt-4 w-full bg-indigo-600 p-2 font-semibold text-white"
          >
            가입
          </button>

          <button
            onClick={(e) => {
              void handleSend(e);
            }}
          >
            메일이 도착하지않았나요?
          </button>

          {useRenderErrorMessage(validateState.codeError)}
          {useRenderErrorMessage(globalState.errorMessage)}

          {globalState.modalMessage && <Modal />}
        </form>
      </div>
    </div>
  );
}

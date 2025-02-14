import { useEmailActivate } from "../../hook/user/useEmailActivate.ts";
import { FormEvent, useState } from "react";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import { useUserStore } from "../../store/UserStore.ts";
import useValidateUser from "../../hook/user/useValidateUser.ts";
import useEmailSend from "../../hook/user/useEmailSend.ts";
import useRenderErrorMessage from "../../hook/useRenderErrorMessage.tsx";

export default function RegisterActivate() {
  const { emailActivate } = useEmailActivate();
  const { emailSend } = useEmailSend();
  const { checkCodeLength } = useValidateUser();

  const { userState, setUserState } = useUserStore();
  const { globalState } = useGlobalStore();

  const [activationCode, setActivationCode] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      checkCodeLength({
        value: activationCode,
        length: 6,
        setValidateState: setUserState,
      })
    ) {
      return;
    }

    if (!(await emailActivate({ activationCode }))) {
      return;
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    await emailSend();
  };

  return (
    <div className="mx-auto flex flex-col p-6 sm:p-16">
      <div className="my-6 font-semibold sm:my-4">코드를 입력해 주세요</div>

      <form className="flex w-full flex-col" onSubmit={handleSubmit}>
        <div className="mb-1 text-start">코드</div>
        <input
          type="text"
          placeholder="코드 입력"
          className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
          onChange={(e) => {
            setActivationCode(e.target.value);
            setUserState({ codeError: undefined });
          }}
        />

        <button
          type="submit"
          className="w- mx-auto mb-2 mt-4 w-full bg-indigo-600 p-2 font-semibold text-white"
        >
          가입
        </button>

        <button
          className="mt-4 text-blue-500"
          onClick={(e) => {
            handleSend(e);
          }}
        >
          메일이 도착하지않았나요?
        </button>

        {useRenderErrorMessage(userState.codeError)}
        {useRenderErrorMessage(globalState.errorMessage)}
      </form>
    </div>
  );
}

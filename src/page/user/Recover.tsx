import { useState } from "react";
import useValidateUser from "../../hook/user/useValidateUser.tsx";
import useRenderErrorMessage from "../../hook/user/useRenderErrorMessage.tsx";
import useRecover from "../../hook/user/useRecover.tsx";

export default function Recover() {
  const { recover } = useRecover();
  const { isInvalidEmail } = useValidateUser();

  const [email, setEmail] = useState<string>("");
  const [validateState, setValidateState] = useState<ValidateUser>({
    emailError: "",
  });

  const handleRecover = () => {
    if (
      isInvalidEmail({
        value: email,
        setValidateState,
      })
    ) {
      return;
    }

    void recover({ email });
  };

  return (
    <div className="bg-customBlack h-screen pt-10">
      <div className="mx-4 rounded border-2 border-gray-600 bg-customGray p-4 text-white sm:mx-auto sm:w-3/4">
        <div className="mb-10 text-2xl font-light">비밀번호 찾기</div>

        <div className="flex px-4">
          <div className="py-2 font-extralight">이메일</div>
          <div className="mx-auto w-2/3">
            <input
              className="mb-1 border-2 border-gray-600 bg-black p-2"
              onChange={(e) => {
                setEmail(e.target.value);
                setValidateState({ emailError: "" });
              }}
            />
            <div className="text-sm font-extralight text-gray-400">
              입력하신 이메일로 비밀번호 재설정 링크를 보내드립니다
            </div>
          </div>
        </div>
        {useRenderErrorMessage(validateState.emailError)}

        <button
          className="ml-auto mt-24 flex justify-end bg-indigo-600 px-4 py-2 font-semibold"
          onClick={() => {
            handleRecover();
          }}
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
}

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore.tsx";
import useValidateUser from "../../hook/user/useValidateUser.tsx";
import useRenderErrorMessage from "../../hook/user/useRenderErrorMessage.tsx";
import useLogin from "../../hook/user/useLogin.tsx";

export default function Login() {
  const { userState, setUserState } = useUserStore();

  const [validateState, setValidateState] = useState<ValidateUser>({
    emailError: "",
    nicknameError: "",
    passwordError: "",
  });

  const { isInvalidEmail, isInvalidPassword } = useValidateUser();
  const { login } = useLogin();
  const navigate = useNavigate();
  const [loginFail, setLoginFail] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (
      isInvalidEmail({
        value: userState.email,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      isInvalidPassword({
        value: userState.password,
        setValidateState,
      })
    ) {
      return;
    }

    if (await login()) {
      navigate("/");
      return;
    }
    setLoginFail(true);
  };

  return (
    <div>
      <div className="mx-auto pt-60 text-center md:p-16 dark:text-slate-200">
        <div className="w-full rounded-lg shadow-md">
          <div className="p-4">Community</div>
          <div className="mx-auto flex w-5/6 flex-col">
            <div className="my-6 font-semibold">로그인</div>

            <form className="flex w-full flex-col" onSubmit={handleLogin}>
              <div className="mb-1 text-start">이메일</div>
              <input
                placeholder="이메일 입력"
                className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
                onChange={(e) => {
                  setUserState({
                    ...userState,
                    email: e.target.value,
                  });
                  setValidateState({
                    ...validateState,
                    emailError: "",
                  });
                  setLoginFail(false);
                }}
              />
              <div className="mb-1 text-start">비밀번호</div>
              <input
                type="password"
                placeholder="비밀번호 입력"
                className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
                onChange={(e) => {
                  setUserState({
                    ...userState,
                    password: e.target.value,
                  });
                  setValidateState({
                    ...validateState,
                    passwordError: "",
                  });
                  setLoginFail(false);
                }}
              />
              <button
                type="submit"
                className="w- mx-auto mb-2 mt-4 w-full bg-indigo-600 p-2 font-semibold text-white"
              >
                로그인
              </button>
              {useRenderErrorMessage(validateState.emailError)}
              {useRenderErrorMessage(validateState.passwordError)}
              {loginFail ? (
                <div className="mx-auto text-start text-base text-red-500">
                  이메일 또는 비밀번호를 확인해 주세요
                </div>
              ) : null}
            </form>

            <div className="mx-auto flex ">
              <a href="/user/helppw" className="my-4 text-blue-400">
                로그인할 수 없습니까?
              </a>
              <div className="mx-2 my-4">|</div>
              <a href="/user/register" className="my-4 text-blue-400">
                계정 만들기
              </a>
            </div>
            <div className="my-4">또는 다음을 사용하여 계속하기</div>
            <div>oauth list</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore.ts";
import useValidateUser from "../../hook/user/useValidateUser.ts";
import useRenderErrorMessage from "../../hook/useRenderErrorMessage.tsx";
import useLogin from "../../hook/user/useLogin.ts";
import useRefreshAccessToken from "../../hook/useRefreshAcccessToken.ts";

export default function Login() {
  const { login } = useLogin();
  const { refreshAccessToken } = useRefreshAccessToken();
  const { isInvalidEmail, isInvalidPassword } = useValidateUser();
  const { userState, setUserState } = useUserStore();
  const navigate = useNavigate();

  const [loginFail, setLoginFail] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // 유효성검사
    if (
      isInvalidEmail({
        value: userState.email,
        setValidateState: setUserState,
      })
    ) {
      return;
    }
    if (
      isInvalidPassword({
        value: userState.password,
        setValidateState: setUserState,
      })
    ) {
      return;
    }
    // 유효성검사 종료

    if (await login()) {
      refreshAccessToken();
      navigate("/");
      return;
    }
    setLoginFail(true);
  };

  return (
    <div className="mx-auto flex h-screen items-center bg-black lg:w-2/3">
      <div className="mx-4 w-full border-2 border-customGray bg-customBlack text-center text-white sm:mx-12">
        <div className="mt-6 sm:mt-10">Community</div>
        <div className="mx-auto flex flex-col p-6 sm:p-16">
          <div className="my-6 font-semibold sm:my-4">로그인</div>

          <form className="flex w-full flex-col" onSubmit={handleLogin}>
            <div className="mb-1 text-start">이메일</div>
            <input
              placeholder="이메일 입력"
              className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
              onChange={(e) => {
                setUserState({ email: e.target.value });
                setUserState({ emailError: undefined });
                setLoginFail(false);
              }}
            />
            <div className="mb-1 text-start">비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호 입력"
              className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
              onChange={(e) => {
                setUserState({ password: e.target.value });
                setUserState({ passwordError: undefined });
                setLoginFail(false);
              }}
            />
            <button
              type="submit"
              className="w- mx-auto mb-2 mt-4 w-full bg-indigo-600 p-2 font-semibold text-white"
            >
              로그인
            </button>
            {useRenderErrorMessage(userState.emailError)}
            {useRenderErrorMessage(userState.passwordError)}
            {loginFail ? (
              <div className="mx-auto text-start text-base text-red-500">
                이메일 또는 비밀번호를 확인해 주세요
              </div>
            ) : null}
          </form>

          <div className="mx-auto flex ">
            <a href="/user/recover" className="my-4 text-blue-400">
              로그인할 수 없습니까?
            </a>
            <div className="mx-2 my-4">|</div>
            <a href="/user/register" className="my-4 text-blue-400">
              계정 만들기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

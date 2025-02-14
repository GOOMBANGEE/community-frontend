import { useGlobalStore } from "../../store/GlobalStore.ts";
import { FormEvent } from "react";
import { useUserStore } from "../../store/UserStore.ts";
import useRegister from "../../hook/user/useRegister.ts";
import useValidateUser from "../../hook/user/useValidateUser.ts";
import useRenderErrorMessage from "../../hook/useRenderErrorMessage.tsx";

export default function RegisterForm() {
  const { register } = useRegister();
  const {
    isInvalidEmail,
    isInvalidNickname,
    isInvalidPassword,
    isInvalidConfirmPassword,
  } = useValidateUser();

  const { userState, setUserState } = useUserStore();
  const { globalState } = useGlobalStore();

  // 유효성검사 + 회원가입 로직
  const handleRegister = async (e: FormEvent) => {
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
      isInvalidNickname({
        value: userState.username,
        setValidateState: setUserState,
      })
    ) {
      return;
    }
    if (
      isInvalidPassword({
        value: userState.password,
        setValidateState: setUserState,
      }) ||
      isInvalidConfirmPassword({
        password: userState.password,
        value: userState.confirmPassword,
        setValidateState: setUserState,
      })
    ) {
      return;
    }
    // 유효성검사 종료
    register();
  };

  return (
    <div className="mx-auto flex flex-col p-6 sm:p-16">
      <div className="my-6 font-semibold sm:my-4">회원가입</div>

      <form className="flex w-full flex-col" onSubmit={handleRegister}>
        <div className="mb-1 text-start">이메일</div>
        <input
          placeholder="이메일 입력"
          className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
          onChange={(e) => {
            setUserState({ email: e.target.value });
            setUserState({ emailError: undefined });
          }}
        />
        <div className="mb-1 text-start">유저명</div>
        <input
          placeholder="유저명 입력"
          className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
          onChange={(e) => {
            setUserState({ username: e.target.value });
            setUserState({ usernameError: undefined });
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
          }}
        />
        <div className="mb-1 text-start">비밀번호 확인</div>
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="mx-auto mb-2 w-full border-2 border-gray-500 bg-black p-2 focus:bg-indigo-100 focus:text-black focus:opacity-90"
          onChange={(e) => {
            setUserState({ confirmPassword: e.target.value });
            setUserState({ passwordError: undefined });
          }}
        />
        <button
          type="submit"
          className="w- mx-auto mb-2 mt-4 w-full bg-indigo-600 p-2 font-semibold text-white"
        >
          가입
        </button>

        {useRenderErrorMessage(userState.emailError)}
        {useRenderErrorMessage(userState.usernameError)}
        {useRenderErrorMessage(userState.passwordError)}
        {useRenderErrorMessage(globalState.errorMessage)}

        <div className="mx-auto mt-2 w-3/4 text-center text-sm text-gray-500">
          비밀번호: 8~20자의 영문 대/소문자 <br />
          숫자, 특수문자를 사용해 주세요
        </div>
      </form>
      <a href="/user/login" className="my-4 text-sky-400">
        이미 계정이 있습니까? 로그인
      </a>
    </div>
  );
}

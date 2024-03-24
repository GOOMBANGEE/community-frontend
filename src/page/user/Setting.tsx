import { useUserStore } from "../../store/UserStore.tsx";
import useValidateUser from "../../hook/user/useValidateUser.tsx";
import { FormEvent, useEffect, useState } from "react";
import useResetNickname from "../../hook/user/useResetNickname.tsx";
import useResetPassword from "../../hook/user/useResetPassword.tsx";
import useRenderErrorMessage from "../../hook/user/useRenderErrorMessage.tsx";
import { useConfirmStore } from "../../store/ConfirmStore.tsx";
import ConfirmModal from "../../component/ConfirmModal.tsx";
import useUserDelete from "../../hook/user/useUserDelete.tsx";

export default function Setting() {
  const { resetNickname } = useResetNickname();
  const { resetPassword } = useResetPassword();
  const { userDelete } = useUserDelete();
  const { isInvalidNickname, isInvalidPassword, isInvalidConfirmPassword } =
    useValidateUser();

  const { userState, setUserState } = useUserStore();
  const { confirmState, setConfirmState } = useConfirmStore();

  const [validateState, setValidateState] = useState<ValidateUser>({
    nicknameError: "",
    passwordError: "",
  });

  const handleResetNickname = (e: FormEvent) => {
    e.preventDefault();
    if (
      isInvalidNickname({
        value: userState.nickname,
        setValidateState,
      })
    ) {
      return;
    }

    void resetNickname();
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (
      isInvalidPassword({
        value: userState.prevPassword,
        setValidateState,
      }) ||
      isInvalidPassword({
        value: userState.password,
        setValidateState,
      }) ||
      isInvalidConfirmPassword({
        password: userState.password,
        value: userState.confirmPassword,
        setValidateState,
      })
    ) {
      return;
    }

    void resetPassword();
  };

  useEffect(() => {
    if (confirmState.confirm) {
      void userDelete();
    }
  }, [confirmState.confirm]);

  return (
    <>
      <div className="p-4 text-white">
        <div className="mb-8 text-xl font-semibold">설정</div>
        <form className="mb-4" onSubmit={handleResetNickname}>
          <div className="mb-4 flex items-center">
            <div className="font-light">닉네임</div>
            <input
              defaultValue={userState.nickname}
              className="ml-auto border-2 border-customGray bg-black p-2"
              onChange={(e) => {
                setUserState({
                  ...userState,
                  nickname: e.target.value,
                });
                setValidateState({
                  nicknameError: "",
                });
              }}
            />
          </div>
          <button type="submit" className="ml-auto flex bg-indigo-600 p-2 px-8">
            저장
          </button>
          {useRenderErrorMessage(validateState.nicknameError)}
        </form>

        <form className="mb-4" onSubmit={handleResetPassword}>
          <div className="mb-4 flex items-center">
            <div className="font-light">현재 비밀번호</div>
            <input
              type="password"
              className="ml-auto border-2 border-customGray bg-black p-2"
              onChange={(e) => {
                setUserState({
                  ...userState,
                  prevPassword: e.target.value,
                });
                setValidateState({
                  passwordError: "",
                });
              }}
            />
          </div>
          <div className="mb-4 flex items-center">
            <div className="font-light">변경할 비밀번호</div>
            <input
              type="password"
              className="ml-auto border-2 border-customGray bg-black p-2"
              onChange={(e) => {
                setUserState({
                  ...userState,
                  password: e.target.value,
                });
                setValidateState({
                  passwordError: "",
                });
              }}
            />
          </div>
          <div className="mb-4 flex items-center">
            <div className="font-light">비밀번호 확인</div>
            <input
              type="password"
              className="ml-auto border-2 border-customGray bg-black p-2"
              onChange={(e) => {
                setUserState({
                  ...userState,
                  confirmPassword: e.target.value,
                });
                setValidateState({
                  passwordError: "",
                });
              }}
            />
          </div>
          <button type="submit" className="ml-auto flex bg-indigo-600 p-2 px-8">
            변경
          </button>
          {useRenderErrorMessage(validateState.passwordError)}
        </form>

        <button
          className="ml-auto bg-red-600 p-2 px-3 font-extralight text-white"
          onClick={() => {
            setConfirmState({
              modalMessage: `비활성화시 계정이 삭제되며<br>다시 사용할 수 없습니다`,
            });
          }}
        >
          계정 비활성화
        </button>
        {confirmState.modalMessage ? <ConfirmModal /> : null}
      </div>
    </>
  );
}

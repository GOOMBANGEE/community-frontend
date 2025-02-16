import { useUserStore } from "../../store/UserStore.ts";
import useValidateUser from "../../hook/user/useValidateUser.ts";
import { FormEvent, useEffect } from "react";
import useUserUpdate from "../../hook/user/useUserUpdate.ts";
import useRenderErrorMessage from "../../hook/useRenderErrorMessage.tsx";
import { useConfirmStore } from "../../store/ConfirmStore.ts";
import ConfirmModal from "../../component/ConfirmModal.tsx";
import useUserDelete from "../../hook/user/useUserDelete.ts";

export default function Setting() {
  const { updateUser } = useUserUpdate();
  const { userDelete } = useUserDelete();
  const { isInvalidUsername, isInvalidPassword, isInvalidConfirmPassword } =
    useValidateUser();

  const { userState, setUserState } = useUserStore();
  const { confirmState, setConfirmState } = useConfirmStore();

  const handleResetNickname = (e: FormEvent) => {
    e.preventDefault();
    if (
      isInvalidUsername({
        value: userState.newUsername,
        setValidateState: setUserState,
      })
    ) {
      return;
    }
    updateUser();
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (
      isInvalidPassword({
        value: userState.prevPassword,
        setValidateState: setUserState,
      }) ||
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
    updateUser();
  };

  useEffect(() => {
    if (confirmState.confirm) {
      userDelete();
    }
  }, [confirmState.confirm]);

  return (
    <div className="h-screen w-full bg-customBlack pt-8">
      <div className="mx-4 rounded bg-customGray p-4 text-white sm:mx-auto sm:w-3/4 lg:w-3/5">
        <div className="mb-8 text-xl font-semibold">설정</div>
        <form className="mb-4" onSubmit={handleResetNickname}>
          <div className="mb-4 flex items-center">
            <div className="font-light">유저명</div>
            <input
              defaultValue={userState.username}
              className="ml-auto border-2 border-customGray bg-black p-2 sm:w-2/3"
              onChange={(e) => {
                setUserState({
                  newUsername: e.target.value,
                  usernameError: undefined,
                });
              }}
            />
          </div>
          <button type="submit" className="ml-auto flex bg-indigo-600 p-2 px-8">
            저장
          </button>
          {useRenderErrorMessage(userState.usernameError)}
        </form>

        <form className="mb-4" onSubmit={handleResetPassword}>
          <div className="mb-4 flex">
            <div className="py-2 font-light">현재 비밀번호</div>
            <div className="ml-auto sm:w-2/3">
              <input
                type="password"
                className="ml-auto w-full border-2 border-customGray bg-black p-2"
                onChange={(e) => {
                  setUserState({
                    prevPassword: e.target.value,
                    passwordError: undefined,
                  });
                }}
              />
              <div className="text-sm font-extralight text-gray-400">
                현재 비밀번호를 입력해주세요
              </div>
            </div>
          </div>

          <div className="mb-4 flex">
            <div className="py-2 font-light">변경할 비밀번호</div>
            <div className="ml-auto sm:w-2/3">
              <input
                type="password"
                className="ml-auto w-full border-2 border-customGray bg-black p-2"
                onChange={(e) => {
                  setUserState({
                    password: e.target.value,
                    passwordError: undefined,
                  });
                }}
              />
              <div className="text-sm font-extralight text-gray-400">
                변경할 비밀번호를 입력해주세요
              </div>
            </div>
          </div>

          <div className="mb-4 flex">
            <div className="py-2 font-light">비밀번호 확인</div>
            <div className="ml-auto sm:w-2/3">
              <input
                type="password"
                className="mb-1 w-full border-2 border-customGray bg-black p-2"
                onChange={(e) => {
                  setUserState({
                    confirmPassword: e.target.value,
                    passwordError: undefined,
                  });
                }}
              />
              <div className="text-sm font-extralight text-gray-400">
                비밀번호 확인을 입력해주세요
              </div>
            </div>
          </div>
          <button type="submit" className="ml-auto flex bg-indigo-600 p-2 px-8">
            변경
          </button>
          {useRenderErrorMessage(userState.passwordError)}
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
    </div>
  );
}

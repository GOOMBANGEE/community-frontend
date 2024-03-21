import ErrorPage from "../ErrorPage.tsx";
import useRecoverCheck from "../../hook/user/useRecoverCheck.tsx";
import { useGlobalStore } from "../../store/GlobalStore.tsx";
import useRenderErrorMessage from "../../hook/user/useRenderErrorMessage.tsx";
import useValidateUser from "../../hook/user/useValidateUser.tsx";
import { useUserStore } from "../../store/UserStore.tsx";
import { FormEvent, useState } from "react";
import useRecoverPassword from "../../hook/user/useRecoverPassword.tsx";

export default function RecoverPassword() {
  const { globalState } = useGlobalStore();
  const { userState, setUserState } = useUserStore();
  const [validateState, setValidateState] = useState<ValidateUser>({
    nicknameError: "",
    passwordError: "",
  });

  const { isInvalidPassword, isInvalidConfirmPassword } = useValidateUser();
  const isValidToken = useRecoverCheck();
  const { recoverPassword } = useRecoverPassword();

  const handleRecoverPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (
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

    void recoverPassword();
  };
  return (
    <>
      {!globalState.loading ? (
        <>
          {isValidToken ? (
            <div className="mx-4 mt-10 rounded border-2 border-gray-600 bg-customGray p-4 text-white">
              <div className="mb-10 text-2xl font-light">비밀번호 변경</div>

              <form className="mb-4" onSubmit={handleRecoverPassword}>
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
                <button
                  type="submit"
                  className="ml-auto flex bg-indigo-600 p-2 px-8"
                >
                  변경
                </button>
              </form>
            </div>
          ) : (
            <ErrorPage />
          )}
        </>
      ) : null}
      <div className="p-4">
        {useRenderErrorMessage(validateState.passwordError)}
      </div>
    </>
  );
}

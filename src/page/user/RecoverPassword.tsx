import ErrorPage from "../ErrorPage.tsx";
import useRecoverTokenCheck from "../../hook/user/useRecoverTokenCheck.ts";
import { useGlobalStore } from "../../store/GlobalStore.ts";
import useRenderErrorMessage from "../../hook/useRenderErrorMessage.tsx";
import useValidateUser from "../../hook/user/useValidateUser.ts";
import { useUserStore } from "../../store/UserStore.ts";
import { FormEvent, useEffect, useState } from "react";
import useRecoverPassword from "../../hook/user/useRecoverPassword.ts";

export default function RecoverPassword() {
  const { recoverTokenCheck } = useRecoverTokenCheck();
  const { recoverPassword } = useRecoverPassword();
  const { isInvalidPassword, isInvalidConfirmPassword } = useValidateUser();

  const { userState, setUserState } = useUserStore();
  const { globalState } = useGlobalStore();
  const [isValidToken, setIsValidToken] = useState<boolean>(false);

  const handleRecoverPassword = async (e: FormEvent) => {
    e.preventDefault();
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

    recoverPassword();
  };

  useEffect(() => {
    const tokenCheck = async () => {
      const valid = await recoverTokenCheck();
      setIsValidToken(valid);
    };
    tokenCheck();
  }, []);

  return (
    <>
      {!globalState.loading ? (
        <>
          {isValidToken ? (
            <div className="h-screen bg-customBlack px-4 pt-10 text-white">
              <div className="rounded border-2 border-gray-600 bg-customGray p-4">
                <div className="mb-10 text-2xl font-light">비밀번호 변경</div>

                <form className="mb-4" onSubmit={handleRecoverPassword}>
                  <div className="mb-4 flex items-center">
                    <div className="font-light">변경할 비밀번호</div>
                    <input
                      type="password"
                      className="ml-auto border-2 border-customGray bg-black p-2 sm:w-2/3"
                      onChange={(e) => {
                        setUserState({
                          password: e.target.value,
                          passwordError: undefined,
                        });
                      }}
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <div className="font-light">비밀번호 확인</div>
                    <input
                      type="password"
                      className="ml-auto border-2 border-customGray bg-black p-2 sm:w-2/3"
                      onChange={(e) => {
                        setUserState({
                          confirmPassword: e.target.value,
                          passwordError: undefined,
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
            </div>
          ) : (
            <ErrorPage />
          )}
        </>
      ) : null}
      <div className="p-4">
        {useRenderErrorMessage(userState.passwordError)}
      </div>
    </>
  );
}

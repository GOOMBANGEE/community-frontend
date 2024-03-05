import { useEffect, useState } from "react";
import { getCookie } from "../../Cookie.tsx";
import RegisterActivate from "./RegisterActivate.tsx";
import RegisterForm from "./RegisterForm.tsx";
import { useUserStore } from "../../store/UserStore.tsx";

export default function Register() {
  const { userState, setUserState } = useUserStore();
  const [hasToken, setHasToken] = useState<boolean>();

  // 페이지 로딩될때 토큰있는지 한번 검사
  useEffect(() => {
    if (getCookie("token")) {
      setUserState({ ...userState, email: getCookie("email") });
      setHasToken(true);
    }
  }, [setUserState, userState]);
  useEffect(() => {
    if (userState.token) {
      setHasToken(true);
    }
  }, [userState.token]);

  return (
    <div className="mx-auto pt-60 text-center md:p-16 dark:text-slate-200">
      <div className="w-full rounded-lg shadow-md">
        <div className="p-4">Community</div>
        <div className="mx-auto flex w-5/6 flex-col">
          {hasToken ? <RegisterActivate /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}

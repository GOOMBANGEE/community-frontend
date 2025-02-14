import { useEffect, useState } from "react";
import { getCookie } from "../../Cookie.ts";
import RegisterActivate from "./RegisterActivate.tsx";
import RegisterForm from "./RegisterForm.tsx";
import { useUserStore } from "../../store/UserStore.ts";

export default function Register() {
  const { userState, setUserState } = useUserStore();
  const [hasToken, setHasToken] = useState<boolean>();

  // 페이지 로딩될때 토큰있는지 한번 검사
  useEffect(() => {
    if (getCookie("token")) {
      setUserState({
        ...userState,
        token: getCookie("token"),
      });
      setHasToken(true);
    }
  }, []);

  useEffect(() => {
    if (userState.token) {
      setHasToken(true);
    }
  }, [userState.token]);

  return (
    <div className="mx-auto flex h-screen items-center bg-black lg:w-2/3">
      <div className="mx-4 w-full border-2 border-customGray bg-customBlack text-center text-white sm:mx-12">
        <div className="mt-6 sm:mt-10">Community</div>
        {hasToken ? <RegisterActivate /> : <RegisterForm />}
      </div>
    </div>
  );
}

import { useUserStore } from "../store/UserStore.ts";
import { useNavigate } from "react-router-dom";
import useLogout from "../hook/user/useLogout.ts";

export default function HeaderDropdown() {
  const { logout } = useLogout();
  const { userState } = useUserStore();
  const navigate = useNavigate();

  const handleSetting = () => {
    navigate("/user/setting");
  };

  const handleLogout = async () => {
    // 페이지 리로드 + 쿠키삭제
    await logout();
    navigate("/");
  };

  return (
    <div className="bg-buttonBlack absolute right-2 top-12 z-10 flex border border-gray-500 bg-customGray text-start">
      <div className="flex-col">
        <div className="p-4 pr-8 text-xl font-semibold">
          {userState.username}
        </div>

        <div className="border-t border-gray-500">
          <button
            className="p-4 pr-8"
            onClick={() => {
              handleSetting();
            }}
          >
            설정
          </button>
        </div>

        <div className="border-t border-gray-500">
          <button
            className="p-4 pr-8"
            onClick={() => {
              handleLogout();
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

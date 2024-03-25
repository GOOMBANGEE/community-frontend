import { deleteCookie } from "../Cookie.tsx";
import { useUserStore } from "../store/UserStore.tsx";
import { useNavigate } from "react-router-dom";

export default function HeaderDropdown() {
  const { userState } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 페이지 리로드 + 쿠키삭제
    deleteCookie("refresh_token");
    navigate("/");
    window.location.reload();
  };

  const handleSetting = () => {
    navigate("/user/setting");
  };

  return (
    <div className="bg-buttonBlack absolute right-2 top-12 z-10 flex border border-gray-500 bg-customGray text-start">
      <div className="flex-col">
        <div className="p-4 pr-8 text-xl font-semibold">
          {userState.nickname}
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

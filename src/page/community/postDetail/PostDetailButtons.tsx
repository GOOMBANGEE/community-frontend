import { usePostStore } from "../../../store/PostStore.tsx";
import { useNavigate } from "react-router-dom";

export default function PostDetailButtons() {
  const navigate = useNavigate();

  const { postState, setPostState } = usePostStore();

  return (
    <div className="flex text-white">
      {/* 글 상하단위치 삭제 수정버튼 */}
      <div className="mb-2 ml-auto mr-4 flex text-sm font-light">
        <button
          onClick={() => {
            setPostState({
              ...postState,
              status: "delete",
            });
            navigate(
              `/community/${postState.communityId}/${postState.id}/check`,
            );
          }}
        >
          삭제
        </button>

        <div className="mx-2">|</div>

        <button
          onClick={() => {
            setPostState({
              ...postState,
              status: "update",
            });
            navigate(
              `/community/${postState.communityId}/${postState.id}/check`,
            );
          }}
        >
          수정
        </button>
      </div>
    </div>
  );
}

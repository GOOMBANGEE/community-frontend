import { usePostStore } from "../../../store/PostStore.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../../store/UserStore.tsx";

export default function PostDetailButtons() {
  const navigate = useNavigate();
  const { communityId, postId } = useParams();

  const { postState, setPostState } = usePostStore();
  const { userState } = useUserStore();

  return (
    <>
      {(postState.creator && postState.creator === userState.id) ||
      postState.creator === null ? (
        <div className="flex text-white">
          {/* 글 상하단위치 삭제 수정버튼 */}
          <div className="mb-2 ml-auto mr-4 flex text-sm font-light">
            <button
              onClick={() => {
                setPostState({
                  ...postState,
                  status: "delete",
                });
                navigate(`/community/${communityId}/${postId}/check`);
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
                navigate(`/community/${communityId}/${postId}/check`);
              }}
            >
              수정
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

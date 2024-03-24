import { usePostStore } from "../../../store/PostStore.tsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUserStore } from "../../../store/UserStore.tsx";

export default function PostDetailButtons() {
  const { postState, setPostState } = usePostStore();
  const { userState } = useUserStore();

  const navigate = useNavigate();
  const { communityId, postId } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const target = searchParams.get("target");
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("p");
  const commentPage = searchParams.get("cp");

  const handleDeleteButton = async () => {
    setPostState({
      ...postState,
      status: "delete",
    });
    navigate(`/community/${communityId}/${postId}/check`);
  };

  const handleUpdateButton = () => {
    setPostState({
      ...postState,
      status: "update",
      mode: mode,
      target: target,
      keyword: keyword,
      page: page,
      commentPage: commentPage,
    });

    postState.creator === userState.id
      ? navigate(`/community/${communityId}/${postState.id}/editor`)
      : navigate(`/community/${communityId}/${postId}/check`);
  };

  return (
    <>
      {(postState.creator && postState.creator === userState.id) ||
      postState.creator === null ? (
        <div className="flex text-white">
          {/* 글 상하단위치 삭제 수정버튼 */}
          <div className="mb-2 ml-auto mr-4 flex text-sm font-light">
            <button
              onClick={() => {
                void handleDeleteButton();
              }}
            >
              삭제
            </button>

            <div className="mx-2">|</div>

            <button
              onClick={() => {
                void handleUpdateButton();
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

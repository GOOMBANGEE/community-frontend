import { useState } from "react";
import { usePostStore } from "../../store/PostStore.tsx";
import useRenderErrorMessage from "../../hook/user/useRenderErrorMessage.tsx";
import useValidatePost from "../../hook/community/post/useValidatePost.tsx";
import usePostUpdate from "../../hook/community/post/usePostUpdate.tsx";
import usePostCreate from "../../hook/community/post/usePostCreate.tsx";
import { useNavigate, useParams } from "react-router-dom";

export default function PostEditor() {
  const { postState, setPostState } = usePostStore();
  const { isTitleValid, isNicknameValid, isPasswordValid, isContentValid } =
    useValidatePost();
  const [validateState, setValidateState] = useState<ValidatePost>({
    titleError: "",
    nicknameError: "",
    passwordError: "",
    contentError: "",
  });

  const navigate = useNavigate();
  const { communityId } = useParams();
  const { postCreate } = usePostCreate();
  const { postUpdate } = usePostUpdate();

  const handlePostButton = async () => {
    if (
      !isTitleValid({
        value: postState.title,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      postState.status === "create" &&
      !isNicknameValid({
        value: postState.nickname,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      !isPasswordValid({
        value: postState.password,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      !isContentValid({
        value: postState.content,
        validateState,
        setValidateState,
      })
    ) {
      return;
    }

    if (postState.status !== "update") {
      await postCreate();
      navigate(`/community/${communityId}`);
      return;
    }
    await postUpdate();
    navigate(`/community/${communityId}/${postState.id}`);
  };

  return (
    <div className="h-screen pb-60 text-white">
      <div className="border-b-2 border-customGray"></div>

      <div className="ml-2 p-2 text-lg font-extralight">
        {postState.status !== "update" ? "글쓰기" : "글 수정"}
      </div>

      <div className="mb-2 border-b-2 border-customGray"></div>

      <div className="mx-2 flex border-2 border-customGray text-center">
        <div className="bg-customGray p-1 px-2 text-sm font-light">제목</div>
        <input
          type="text"
          className="w-fit grow bg-black px-2"
          onChange={(e) => {
            setPostState({
              ...postState,
              title: e.target.value,
            });
            setValidateState({
              ...validateState,
              titleError: "",
            });
          }}
          defaultValue={postState.title}
        />
      </div>
      <div className="mx-auto mb-2 w-full p-2 text-center">
        <div className="flex border-2 border-customGray">
          {postState.status !== "update" ? (
            <>
              <div className="flex w-1/2">
                <div className="h-fit w-12 bg-customGray p-1 px-2 text-sm font-light">
                  이름
                </div>
                <input
                  type="text"
                  className="w-full bg-black px-2"
                  onChange={(e) => {
                    setPostState({
                      ...postState,
                      nickname: e.target.value,
                    });
                    setValidateState({
                      ...validateState,
                      nicknameError: "",
                    });
                  }}
                />
              </div>
              <div className="flex w-1/2">
                <div className="w-1/2 bg-customGray p-1 px-2 text-sm font-light">
                  비밀번호
                </div>
                <input
                  type="password"
                  className="w-full bg-black px-2"
                  onChange={(e) => {
                    setPostState({
                      ...postState,
                      password: e.target.value,
                    });
                    setValidateState({
                      ...validateState,
                      passwordError: "",
                    });
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="relative mx-2 mb-4 h-1/2">
        <textarea
          className="mx-auto mb-4 h-full w-full rounded bg-white p-4 text-black"
          onChange={(e) => {
            setPostState({
              ...postState,
              content: e.target.value,
            });
            setValidateState({
              ...validateState,
              contentError: "",
            });
          }}
          placeholder="내용을 입력해주세요"
          value={postState.content}
        ></textarea>
      </div>

      {useRenderErrorMessage(validateState.titleError)}
      {useRenderErrorMessage(validateState.nicknameError)}
      {useRenderErrorMessage(validateState.passwordError)}
      {useRenderErrorMessage(validateState.contentError)}

      <button
        className="justify-item-end mb-2 ml-auto mr-2 flex rounded border-2 border-customGray p-1 px-4 font-extralight"
        onClick={() => {
          void handlePostButton();
        }}
      >
        {postState.status !== "update" ? "작성" : "수정"}
      </button>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { usePostStore } from "../../store/PostStore.ts";
import useRenderErrorMessage from "../../hook/useRenderErrorMessage.tsx";
import useValidatePost from "../../hook/community/post/useValidatePost.ts";
import usePostUpdate from "../../hook/community/post/usePostUpdate.ts";
import usePostCreate from "../../hook/community/post/usePostCreate.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useTokenStore } from "../../store/TokenStore.ts";
import ReactQuill from "react-quill-new";

interface ValidatePost {
  titleError: string | undefined;
  usernameError: string | undefined;
  passwordError: string | undefined;
  contentError: string | undefined;
}

export default function PostEditor() {
  const { postCreate } = usePostCreate();
  const { postUpdate } = usePostUpdate();
  const {
    isInvalidTitle,
    isInvalidUsername,
    isInvalidPassword,
    isInvalidContent,
  } = useValidatePost();

  const { postState, setPostState } = usePostStore();
  const { tokenState } = useTokenStore();

  const navigate = useNavigate();
  const { communityId } = useParams();

  const [validateState, setValidateState] = useState<ValidatePost>({
    titleError: undefined,
    usernameError: undefined,
    passwordError: undefined,
    contentError: undefined,
  });

  const handlePostButton = async () => {
    if (
      isInvalidTitle({
        value: postState.title,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      postState.status === "create" &&
      !tokenState.accessToken &&
      isInvalidUsername({
        value: postState.username,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      postState.password &&
      isInvalidPassword({
        value: postState.password,
        setValidateState,
      })
    ) {
      return;
    }
    if (
      isInvalidContent({
        value: postState.content,
        setValidateState,
      })
    ) {
      return;
    }
    // update
    if (postState.status === "update") {
      const postId = await postUpdate();
      if (postId) {
        navigate(`/community/${communityId}/${postId}?page=1&commentPage=1`);
        return;
      }
    }
    // default: create
    const postId = await postCreate();
    if (postId) {
      navigate(`/community/${communityId}/${postId}?page=1&commentPage=1`, {
        replace: true,
      });
    }
  };
  // react-quill setting
  const quillRef = useRef<ReactQuill>(null);
  const reactQuillModules = {
    toolbar: {
      container: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        ["blockquote", "code-block"],
        ["link", "image"],
      ],
    },
  };

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const clipboardItemList = e.clipboardData?.items;
      if (!clipboardItemList) return;

      const item = clipboardItemList[0];
      if (!item.type.startsWith("image")) return;

      // blob 객체로 이미지 가져오기
      const blob = item.getAsFile();
      if (!blob) return;

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        insertToEditor(image.src);
      };
    };

    const insertToEditor = (imageUrl: string | null) => {
      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection();
      if (!range) return;
      editor?.insertEmbed(range.index, "image", imageUrl);
    };

    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.root.addEventListener("paste", handlePaste);
    }

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div className="flex h-full flex-col text-white sm:px-2 lg:bg-customBlack">
      <div className="border-b-2 border-customGray"></div>

      <div className="ml-2 p-2 text-lg font-extralight">
        {postState.status !== "update" ? "글쓰기" : "글 수정"}
      </div>

      <div className="mb-2 border-b-2 border-customGray"></div>

      <div className="mx-2 flex border-2 border-customGray text-center">
        <input
          type="text"
          className="w-full grow bg-black px-2 py-1"
          onChange={(e) => {
            setPostState({ title: e.target.value });
            setValidateState({
              ...validateState,
              titleError: undefined,
            });
          }}
          placeholder={"제목"}
          defaultValue={postState.title}
        />
      </div>
      <div className="mx-auto mb-2 w-full p-2 text-center">
        <div className="flex border-2 border-customGray">
          {postState.status !== "update" && !tokenState.accessToken ? (
            <>
              <div className="flex w-1/2">
                <div className="h-fit w-12 bg-customGray p-1 px-2 text-sm font-light">
                  이름
                </div>
                <input
                  type="text"
                  className="w-full bg-black px-2"
                  onChange={(e) => {
                    setPostState({ username: e.target.value });
                    setValidateState({
                      ...validateState,
                      usernameError: undefined,
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
                    setPostState({ password: e.target.value });
                    setValidateState({
                      ...validateState,
                      passwordError: undefined,
                    });
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="relative mx-2 mb-4 flex h-1/2 flex-col">
        <ReactQuill
          ref={quillRef}
          className={"custom-quill h-full placeholder-white"}
          modules={reactQuillModules}
          onChange={(content) => {
            setPostState({ content });
            setValidateState({
              ...validateState,
              contentError: undefined,
            });
          }}
          placeholder="내용을 입력해주세요"
          value={postState.content}
        />
      </div>

      <button
        className="ml-auto mr-2 mt-10 rounded border-2 border-customGray p-1 px-4 font-extralight"
        onClick={handlePostButton}
      >
        {postState.status !== "update" ? "작성" : "수정"}
      </button>

      {useRenderErrorMessage(validateState.titleError)}
      {useRenderErrorMessage(validateState.usernameError)}
      {useRenderErrorMessage(validateState.passwordError)}
      {useRenderErrorMessage(validateState.contentError)}
    </div>
  );
}

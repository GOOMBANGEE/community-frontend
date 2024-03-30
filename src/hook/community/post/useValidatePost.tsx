import useValidator from "../../useValidator.tsx";

export default function useValidatePost() {
  const { validator } = useValidator();

  const isInvalidTitle = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{2,50}$/,
      errorField: "titleError",
      errorMessage: "제목은 2자 이상 50자 이하로 작성해주세요",
      validateVariable: "post",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isInvalidNickname = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{2,20}$/,
      errorField: "nicknameError",
      errorMessage: "닉네임은 2자 이상 20자 이하로 작성해주세요",
      validateVariable: "post",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isInvalidPassword = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{4,20}$/,
      errorField: "passwordError",
      errorMessage: "비밀번호는 4자 이상 20자 이하로 작성해주세요",
      validateVariable: "post",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isInvalidContent = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^(.|\n)+$/,
      errorField: "contentError",
      errorMessage: "내용이 비어있습니다",
      validateVariable: "post",
    };
    return validator({ ...props, ...validationConfig });
  };

  return {
    isInvalidTitle,
    isInvalidNickname,
    isInvalidPassword,
    isInvalidContent,
  };
}

import useValidator from "../../useValidator.tsx";

export default function useValidateReply() {
  const { validator } = useValidator();

  const isInvalidNickname = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{2,20}$/,
      errorField: "nicknameError",
      errorMessage: "닉네임은 2자 이상 20자 이하로 작성해주세요",
      validateVariable: "reply",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isInvalidPassword = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{4,20}$/,
      errorField: "passwordError",
      errorMessage: "비밀번호는 4자 이상 20자 이하로 작성해주세요",
      validateVariable: "reply",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isInvalidContent = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.+$/,
      errorField: "contentError",
      errorMessage: "내용이 비어있습니다",
      validateVariable: "reply",
    };
    return validator({ ...props, ...validationConfig });
  };

  return {
    isInvalidNickname,
    isInvalidPassword,
    isInvalidContent,
  };
}

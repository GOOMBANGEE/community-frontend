import useValidator from "../../useValidator.tsx";

export default function useValidateReply() {
  const { validator } = useValidator();

  const isNicknameValid = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{2,20}$/,
      errorField: "nicknameError",
      errorMessage: "닉네임은 2자 이상 20자 이하로 작성해주세요",
      validateVariable: "reply",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isPasswordValid = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{4,20}$/,
      errorField: "passwordError",
      errorMessage: "비밀번호는 4자 이상 20자 이하로 작성해주세요",
      validateVariable: "reply",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isContentValid = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.+$/,
      errorField: "contentError",
      errorMessage: "내용이 비어있습니다",
      validateVariable: "reply",
    };
    return validator({ ...props, ...validationConfig });
  };

  return {
    isNicknameValid,
    isPasswordValid,
    isContentValid,
  };
}

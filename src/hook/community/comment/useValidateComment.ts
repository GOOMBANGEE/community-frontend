import useValidator from "../../useValidator.ts";

export default function useValidateComment() {
  const { validator } = useValidator();

  const isInvalidUsername = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{2,20}$/,
      errorField: "usernameError",
      errorMessage: "유저명은 2자 이상 20자 이하로 작성해주세요",
      validateVariable: "comment",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isInvalidPassword = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^.{4,20}$/,
      errorField: "passwordError",
      errorMessage: "비밀번호는 4자 이상 20자 이하로 작성해주세요",
      validateVariable: "comment",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isInvalidContent = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^(.|\n)+$/,
      errorField: "contentError",
      errorMessage: "내용이 비어있습니다",
      validateVariable: "comment",
    };
    return validator({ ...props, ...validationConfig });
  };

  return { isInvalidUsername, isInvalidPassword, isInvalidContent };
}

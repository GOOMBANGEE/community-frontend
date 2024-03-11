import useValidator from "../useValidator.tsx";

export default function useValidateUser() {
  const { validator } = useValidator();

  const isEmailValid = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex:
        /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
      errorField: "emailError",
      errorMessage: "이메일을 확인해 주세요",
      validateVariable: "user",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isNicknameValid = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^[a-zA-Z0-9]{2,20}$/,
      errorField: "nicknameError",
      errorMessage: "이름은 2~20자 이내로 설정해 주세요",
      validateVariable: "user",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isPasswordValid = (props: ValidationProps) => {
    const validationConfig: ValidationConfig = {
      regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*\d).{8,20}$/,
      errorField: "passwordError",
      errorMessage: "비밀번호를 확인해 주세요",
      validateVariable: "user",
    };
    return validator({ ...props, ...validationConfig });
  };

  const isConfirmPasswordValid = (
    props: ValidationProps & { password: string },
  ) => {
    const validationConfig: ValidationConfig = {
      regex: new RegExp(`^${props.password}$`),
      errorField: "passwordError",
      errorMessage: "비밀번호를 확인해 주세요",
      validateVariable: "user",
    };
    return validator({ ...props, ...validationConfig });
  };

  const checkCodeLength = (props: ValidationProps & { length: number }) => {
    const validationConfig: ValidationConfig = {
      regex: new RegExp(`^.${length}$`),
      errorField: "codeError",
      errorMessage: "코드를 다시 한번 확인해 주세요",
      validateVariable: "user",
    };
    return validator({ ...props, ...validationConfig });
  };

  return {
    isEmailValid,
    isNicknameValid,
    isPasswordValid,
    isConfirmPasswordValid,
    checkCodeLength,
  };
}

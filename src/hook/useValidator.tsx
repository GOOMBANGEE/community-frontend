export default function useValidator() {
  const validator = (props: ValidationProps & ValidationConfig) => {
    if (props.regex.test(props.value)) {
      return true;
    }

    props.setValidateState({
      ...props.validateState,
      [props.errorField]: props.errorMessage,
    });

    return false;
  };

  return { validator };
}

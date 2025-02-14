export default function useValidator() {
  const validator = (props: ValidationProps & ValidationConfig) => {
    if (!props.value || !props.regex.test(props.value)) {
      props.setValidateState({
        [props.errorField]: props.errorMessage,
      });
      return true;
    }
    return false;
  };

  return { validator };
}

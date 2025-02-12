import { useEnvStore } from "../../../store/EnvStore.ts";
import axios from "axios";
import { usePostStore } from "../../../store/PostStore.ts";

interface Props {
  password: string;
}

export default function usePostPasswordCheck() {
  const { postState } = usePostStore();
  const { envState } = useEnvStore();

  const postPasswordCheck = async (props: Readonly<Props>) => {
    const postUrl = envState.postUrl;
    await axios.post(`${postUrl}/${postState.id}/check`, {
      password: props.password,
    });
    return true;
  };

  return { postPasswordCheck };
}

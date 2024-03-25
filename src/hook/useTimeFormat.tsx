import { useEnvStore } from "../store/EnvStore.tsx";

interface Props {
  time: Date;
}

// postDetail
export default function useTimeFormat() {
  const { envState } = useEnvStore();

  const formatTime = (props: Props) => {
    const postDate = new Date(
      new Date(props.time).getTime() + envState.timeDifference * 60 * 60 * 1000,
    );

    const hour = ("0" + postDate.getHours()).slice(-2);
    const minute = ("0" + postDate.getMinutes()).slice(-2);
    const second = ("0" + postDate.getSeconds()).slice(-2);
    const formattedDate = postDate.toISOString().replace("T", " ").slice(0, 10);
    const formattedTime = formattedDate + " " + `${hour}:${minute}:${second}`;

    return `${formattedTime}`;
  };

  // postList
  const formatDate = (props: Props) => {
    const today = new Date();
    const postDate = new Date(
      new Date(props.time).getTime() + envState.timeDifference * 60 * 60 * 1000,
    );

    if (
      today.getDate() === postDate.getDate() &&
      today.getMonth() === postDate.getMonth() &&
      today.getFullYear() === postDate.getFullYear()
    ) {
      return postDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      const year = postDate.getFullYear();
      const month = ("0" + (postDate.getMonth() + 1)).slice(-2);
      const date = ("0" + (postDate.getDate() + 1)).slice(-2);

      return `${year}.${month}.${date}`;
    }
  };

  // communityPreview
  // 시간 차이를 표시하는 함수
  // n 초전,  n 분전, n 시간전, n 일전
  const formatTimeDifference = (props: Props) => {
    const now = new Date();
    const postDate = new Date(
      new Date(props.time).getTime() + envState.timeDifference * 60 * 60 * 1000,
    );
    const differenceInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds}초 전`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes}분 전`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours}시간 전`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days}일 전`;
    }
  };

  return { formatTime, formatDate, formatTimeDifference };
}

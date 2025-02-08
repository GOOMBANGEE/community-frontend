import { useEnvStore } from "../store/EnvStore.ts";

interface Props {
  time: string;
}

export default function useTimeFormat() {
  const { envState } = useEnvStore();
  const timeLocale = envState.timeLocale;
  const timeZone = envState.timeZone;

  // timeString = 2025-02-02T18:20:51.011Z = Date().toISOString()
  // timeLocale: ko-KR, timeZone : Asia/Seoul
  // localeTime = 2025. 02. 03. 03:20:51
  // year -> 0,4 | month -> 6,8 | day -> 10,12
  // hour -> 14,16 | minute -> 17,19 | second -> 20,22
  const timeFormatLocaleTime = (timeString: string) => {
    const localeTime = new Date(timeString).toLocaleTimeString(timeLocale, {
      timeZone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const year = localeTime.slice(0, 4);
    const month = localeTime.slice(6, 8);
    const day = localeTime.slice(10, 12);
    const hour = localeTime.slice(14, 16);
    const minute = localeTime.slice(17, 19);
    const second = localeTime.slice(20, 22);

    return { year, month, day, hour, minute, second };
  };

  // postDetail, comment
  // yyyy-mm-dd hh:mm:ss
  const timeFormatYYYYMMDDHHMMSS = (props: Readonly<Props>) => {
    const localeTime = timeFormatLocaleTime(props.time);
    return `${localeTime.year}-${localeTime.month}-${localeTime.day} ${localeTime.hour}:${localeTime.minute}:${localeTime.second}`;
  };

  // postList
  // hh:mm
  // yyyy.mm.dd -> 24시간 이상 차이날때
  const timeFormatPostList = (props: Readonly<Props>) => {
    const postTime = new Date(props.time);
    const now = new Date();
    // 현재 시간과 차이 계산
    const diffInHours = Math.floor(
      (now.getTime() - postTime.getTime()) / 1000 / (60 * 60),
    );

    const localeTime = timeFormatLocaleTime(props.time);
    if (diffInHours < 24) {
      return `${localeTime.hour}:${localeTime.minute}`;
    }

    return `${localeTime.year}.${localeTime.month}.${localeTime.day}`;
  };

  // communityPreview
  // 시간 차이를 표시하는 함수
  // n 초전,  n 분전, n 시간전, n 일전
  const timeFormatDifference = (props: Readonly<Props>) => {
    const postTime = new Date(props.time);
    const now = new Date();

    // 현재 시간과 차이 계산
    const differenceInSeconds = Math.floor(
      (now.getTime() - postTime.getTime()) / 1000,
    );
    const diffInMinutes = Math.floor(differenceInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds}초 전`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  };

  return { timeFormatYYYYMMDDHHMMSS, timeFormatPostList, timeFormatDifference };
}

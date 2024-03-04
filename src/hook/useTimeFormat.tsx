export default function useTimeFormat() {
  const formatTime = (time: Date) => {
    const formattedTime = new Date(time)
      .toISOString()
      .replace("T", " ")
      .slice(0, -5);
    return `${formattedTime}`;
  };

  const formatDate = (time: Date) => {
    const today = new Date();
    const postDate = new Date(time);

    if (
      today.getDate() === postDate.getDate() &&
      today.getMonth() === postDate.getMonth() &&
      today.getFullYear() === postDate.getFullYear()
    ) {
      return postDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      const year = postDate.getFullYear();
      const month = postDate.getMonth() + 1;
      const date = postDate.getDate();

      return `${year}.${month}.${date}`;
    }
  };

  // 시간 차이를 표시하는 함수
  // n 초전,  n 분전, n 시간전, n 일전
  const formatTimeDifference = (time: Date) => {
    const now = new Date();
    const postTime = new Date(time);
    const differenceInSeconds = Math.floor(
      (now.getTime() - postTime.getTime()) / 1000,
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

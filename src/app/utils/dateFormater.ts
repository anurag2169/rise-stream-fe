import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatCreatedAt = (dateString: any) => {
  return dayjs(dateString).fromNow();
};

export const truncateText = (text: string, maxLength: number = 48): string => {
  if (text?.length <= maxLength) return text;
  return text?.substring(0, maxLength) + "...";
};

export const formatDuration = (duration: string): string => {
  const seconds = parseFloat(duration);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds}`;
};

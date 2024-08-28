import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatCreatedAt = (dateString: any) => {
  return dayjs(dateString).fromNow();
};

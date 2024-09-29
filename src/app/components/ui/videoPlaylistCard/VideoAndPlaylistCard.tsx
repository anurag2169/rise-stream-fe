import {
  formatDuration,
  formatCreatedAt,
  truncateText,
} from "@/app/utils/dateFormater";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface videoAndPlaylistProps {
  id: string;
  title: string;
  description: string;
  fullname: string;
  thumbnail: string;
  avatarUrl: string;
  views: number;
  createdAt: string;
  duration: any;
}
const VideoAndPlaylistCard: React.FC<videoAndPlaylistProps> = ({
  id,
  title,
  description,
  fullname,
  thumbnail,
  avatarUrl,
  views,
  createdAt,
  duration,
}) => {
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center mx-2 md:mx-0 md:p-4 md:space-x-4 w-full  md:w-3/4 ">
        <div className="relative  md:w-80 w-full">
          <Link href={`/watch/${id}`}>
            <Image
              src={thumbnail}
              alt="Video thumbnail"
              width={320}
              height={180}
              className="w-full h-52 md:h-48 object-cover rounded-t-xl md:rounded-xl"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {formatDuration(duration)}
            </div>
          </Link>
        </div>
        <div className="my-2 md:my-5">
          <Link href={`/watch/${id}`}>
            <CardContent>
              <div className="font-semibold text-xl ">{title}</div>
              <p className="text-gray-500 text-sm">
                {views} views | {formatCreatedAt(createdAt)}
              </p>
              <div className="py-2 flex items-center gap-2">
                <Avatar className="rounded-full w-6 h-6 ">
                  <AvatarImage
                    src={avatarUrl}
                    alt="Channel avatar"
                    className="rounded-full"
                  />
                  <AvatarFallback className="text-xs">RS</AvatarFallback>
                </Avatar>
                <p className="text-gray-500 text-xs capitize">{fullname}</p>
              </div>
              <div className="text-gray-700">
                {truncateText(description, 60)}
              </div>
            </CardContent>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default VideoAndPlaylistCard;

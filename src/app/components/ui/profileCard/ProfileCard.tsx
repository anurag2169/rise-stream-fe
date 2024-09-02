import { formatCreatedAt, truncateText } from "@/app/utils/dateFormater";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";

interface profileCardType {
  name: string;
  username: string;
  description: string;
  avatarUrl: string;
  createdAt?: string;
}

const ProfileCard: React.FC<profileCardType> = ({
  name,
  username,
  description,
  avatarUrl,
  createdAt,
}) => {
  return (
    <>
      <div className="flex flex-row items-center content-center mx-3 p-2 space-x-4 border rounded-full w-80">
        <Link href={`/channel/${username}`}>
          <div className="flex items-center justify-center">
            <Avatar className="rounded-full w-20 h-20">
              <AvatarImage
                src={avatarUrl}
                alt="Channel avatar"
                className="rounded-full"
              />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </div>
        </Link>
        <div className="">
          <Link href={`/channel/${username}`}>
            <CardContent className="px-0 py-0">
              <div className="font-semibold text-xl">{name}</div>
              <p className="text-gray-500">@{username}</p>
              <p className="text-gray-500">
                {createdAt && <span>{formatCreatedAt(createdAt)}</span>}
              </p>
              {/* <div className="text-gray-700 ">
                {truncateText(description, 90)}
              </div> */}
            </CardContent>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;

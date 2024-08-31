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
      <div className="flex flex-col md:flex-row items-center p-4 space-x-4 w-3/4 border-b">
        <Link href={`/channel/${username}`}>
          <div className="w-80 flex items-center justify-center">
            <Avatar className="rounded-full w-36 h-36 ">
              <AvatarImage
                src={avatarUrl}
                alt="Channel avatar"
                className="rounded-full"
              />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </div>
        </Link>
        <div>
          <Link href={`/channel/${username}`}>
            <CardContent>
              <div className="font-semibold text-xl ">{name}</div>
              <p className="text-gray-500 pb-1 pt-2">
                @{username}{" "}
                {createdAt && (
                  <>
                    <span>• </span>
                    {formatCreatedAt(createdAt)}
                  </>
                )}
              </p>
              <div className="text-gray-700">
                {truncateText(description, 90)}
              </div>
            </CardContent>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;

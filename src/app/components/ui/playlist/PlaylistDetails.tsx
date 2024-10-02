import { formatCreatedAt } from "@/app/utils/dateFormater";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ChevronDownIcon,
  Pencil1Icon,
  Pencil2Icon,
  PlayIcon,
  ResetIcon,
  ShuffleIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useState } from "react";

const PlaylistDetails = ({
  gradientStyle,
  playlistThumbnail,
  plyName,
  playlistOwner,
  playlistLength,
  playlistUpdatedAt,
  playlistDescription,
  playlistOwnerId,
  currentUser,
}: any) => {
  const [toggleDesc, setToggleDesc] = useState(false);
  const [descContent, setDescContent] = useState("");

  const [togglePlaylistname, setTogglePlaylistname] = useState(false);
  const [nameContent, setNameContent] = useState("");

  const toggleDescription = () => {
    setToggleDesc(!toggleDesc);
    setDescContent(playlistDescription);
  };

  const togglePlaylistName = () => {
    setTogglePlaylistname(!togglePlaylistname);
    setNameContent(plyName);
  };
  return (
    <>
      <Card style={gradientStyle} className="w-full md:w-1/3 h-1/2">
        <CardHeader className="p-4">
          <Image
            src={playlistThumbnail || "/placeholder.svg"}
            alt="System Design Course"
            className="w-full h-auto rounded-lg"
            width="350"
            height="200"
            style={{ aspectRatio: "350/200", objectFit: "cover" }}
          />
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="text-2xl font-bold capitalize  flex gap-3">
            {!togglePlaylistname ? (
              <p className="">{plyName}</p>
            ) : (
              <>
                <div className="flex flex-col w-full max-w-sm items-start gap-2 space-x-2">
                  <Input
                    required
                    type="text"
                    id={nameContent}
                    name={nameContent}
                    value={nameContent}
                    onChange={(e) => {
                      setNameContent(e.target.value);
                    }}
                    placeholder="Edit Playlist Name"
                    className="w-full rounded-md border border-muted-foreground/20 text-sm focus:border-primary focus:outline-none bg-muted dark:bg-muted-dark dark:text-muted-foreground-dark"
                  />
                  <Button variant={"secondary"} type="submit">
                    Save
                  </Button>
                </div>
              </>
            )}
            {playlistOwnerId === currentUser?._id && (
              <div
                className="cursor-pointer mt-2 "
                onClick={togglePlaylistName}
                title="Edit Playlist Name"
              >
                {!togglePlaylistname ? (
                  <Pencil2Icon className="w-5 h-4 mr-2" />
                ) : (
                  <ResetIcon className="w-5 h-4 mr-2" />
                )}
              </div>
            )}
          </div>
          <p className="">{playlistOwner}</p>
          <div className="flex items-center space-x-2 ">
            <span>Public</span>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
          <p className="">
            <span className="mr-2">{playlistLength} videos</span>
            <span>{formatCreatedAt(playlistUpdatedAt)}</span>
          </p>
          <div className="flex space-x-2">
            <Button variant="default" className="flex-1">
              <PlayIcon className="w-4 h-4 mr-2" />
              Play all
            </Button>
            <Button variant="outline" className="flex-1">
              <ShuffleIcon className="w-4 h-4 mr-2" />
              Shuffle
            </Button>
          </div>
          <div className="flex items-start gap-3 ">
            {!toggleDesc ? (
              <p className="">{playlistDescription}</p>
            ) : (
              <>
                <div className="flex flex-col w-full max-w-sm items-start gap-2 space-x-2">
                  <Input
                    required
                    type="text"
                    id={descContent}
                    name={descContent}
                    value={descContent}
                    onChange={(e) => {
                      setDescContent(e.target.value);
                    }}
                    placeholder="Edit Playlist description"
                    className="w-full rounded-md border border-muted-foreground/20 text-sm focus:border-primary focus:outline-none bg-muted dark:bg-muted-dark dark:text-muted-foreground-dark"
                  />
                  <Button variant={"secondary"} type="submit">
                    Save
                  </Button>
                </div>
              </>
            )}
            {playlistOwnerId === currentUser?._id && (
              <div
                className="cursor-pointer mt-2 "
                onClick={toggleDescription}
                title="Edit Playlist description"
              >
                {!toggleDesc ? (
                  <Pencil2Icon className="w-5 h-4 mr-2" />
                ) : (
                  <ResetIcon className="w-5 h-4 mr-2" />
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PlaylistDetails;

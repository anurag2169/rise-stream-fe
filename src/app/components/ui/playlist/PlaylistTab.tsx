import React from "react";
import { Button } from "@/components/ui/button";
import { ListBulletIcon, PlusIcon } from "@radix-ui/react-icons";
import PlaylistCard from "./PlaylistCard";
import { Video } from "@/app/types/video.type";
import CreatePlaylistDialog from "./CreatePlaylistDialog";

interface Playlist {
  _id: string;
  name: string;
  description: string;
  updatedAt: string;
  status: string;
  image: string;
  length: number;
  videos: Video[];
  owner: string;
}

interface PlaylistTabProps {
  playlists: Playlist[];
}

const PlaylistTab: React.FC<PlaylistTabProps> = ({ playlists = [] }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Created playlists</h2>
        <CreatePlaylistDialog />
      </div>
      <div className="w-full flex justify-center items-center mt-4">
        {playlists.length == 0 && <span>Please Create Some Playlists</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {playlists.map((playlist: Playlist) => (
          <PlaylistCard
            key={playlist?._id}
            playlistId={playlist?._id}
            playlistTitle={playlist?.name}
            playlistUpdatedAt={playlist?.updatedAt}
            playlistStatus={"public"}
            playlistImage={playlist?.videos[0]?.thumbnail}
            playlistLength={playlist?.videos.length}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistTab;

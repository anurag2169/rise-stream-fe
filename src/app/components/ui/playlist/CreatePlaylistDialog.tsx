import React from "react";
import { CopyIcon, PlusIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const CreatePlaylistDialog = () => {
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Create Playlist
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-xl max-w-80 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Playlist</DialogTitle>
            <DialogDescription>
              Organize your favorite content effortlessly with personalized
              playlists.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Enter playlist title"
                required
              />
              <Input
                type="text"
                id="description"
                name="description"
                placeholder="Add a brief description"
                required
              />

              <div className="w-1/2 mt-2">
                <Button type="button" variant="outline">
                  Save Playlist
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePlaylistDialog;

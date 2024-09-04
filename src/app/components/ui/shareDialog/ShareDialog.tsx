import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  Share1Icon,
  Share2Icon,
} from "@radix-ui/react-icons";

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
import { Label } from "@/components/ui/label";

const ShareDialog = ({ link }: any) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(link);
  }, [link]);
  const [linkedCopied, setLinkedCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setLinkedCopied(true);
        setTimeout(() => {
          setLinkedCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1">
          <Share2Icon className="h-5 w-5" />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl max-w-80 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input type="url" id="link" value={inputValue} readOnly />
          </div>
          <Button
            onClick={handleCopyClick}
            type="button"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            {linkedCopied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AccountDetails = ({ email, name, avatarUrl, userName }: any) => {
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Account</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Choose how you appear and what you see on Rise Stream.
          </h3>
          <p>
            Signed in as
            <span className="font-semibold text-blue-500 mx-2">{email}</span>
          </p>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Your Rise Stream channel</h4>
            <p>
              This is your public presence on Rise Stream. You need a channel to
              upload your own videos, comment on videos or create playlists.
            </p>
            <div className="flex items-center space-x-4">
              <span>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
              </span>
              <div>
                <p className="font-semibold">{name}</p>
                <Button variant="link" className="p-0 h-auto font-normal">
                  Channel status and features
                </Button>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto mr-2">
              <Link href={`/channel/${userName}`}>
                Add or manage your channel(s)
              </Link>
            </Button>
            <Button variant="link" className="p-0 h-auto">
              <Link href={"/admin?query=advanced"}>View advanced settings</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
